import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Table } from "../ui/table";
import { HeaderTable } from "./header-table";
import { BodyTable } from "./body-table";

import { SearchState } from "./search-table";
import { ColumnChooserState } from "./column-chooser";
import { ToolbarTableCommands } from "./toolbar-table-commands";
import { BottomTableCommands } from "./bottom-table-commands";
import { ColumnFilterState } from "./column-filter-controller/column-filter-controller";

interface IRenderTableProps<TData> {
  id: string;
  data: TData[];
  refetch: (() => Promise<void>) | undefined;
  columns: ColumnDef<TData>[];
  emptyMessage?: string;
  columnChooser?: ColumnChooserState;
  columnFilter?: ColumnFilterState;

  searchOptions?: SearchState;
  defaultSorting?: SortingState;
  defaultPagination?: PaginationState;
  defaultSizes?: number[];

  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactElement;
  getRowCanExpand?: (row: Row<TData>) => boolean;
}

export default function RenderTable<T>(props: Readonly<IRenderTableProps<T>>) {
  const {
    id,
    data,
    refetch,
    columns,
    emptyMessage,
    searchOptions,
    columnChooser = {
      text: "Colunas",
    },
    columnFilter = {
      columns: [],
    },
    defaultSorting,
    defaultPagination = {
      pageSize: 10,
      pageIndex: 0,
    },
    defaultSizes = [5, 10, 20],
    renderSubComponent,
    getRowCanExpand,
  } = props;

  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    rowCount: data.length,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    onColumnVisibilityChange: setColumnVisibility,

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    state: {
      sorting,
      columnVisibility,
      pagination,
      columnFilters,
    },
  });

  return (
    <section id={id} className="h-full flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-2">
        <ToolbarTableCommands<T>
          table={table}
          refetch={refetch}
          searchOptions={searchOptions}
          columnChooser={columnChooser}
          columnFilter={columnFilter}
        />

        <Table>
          <HeaderTable<T> table={table} />
          <BodyTable<T>
            emptyMessage={emptyMessage}
            table={table}
            renderSubComponent={renderSubComponent}
          />
        </Table>
      </div>

      <BottomTableCommands<T> table={table} sizes={defaultSizes} />
    </section>
  );
}
