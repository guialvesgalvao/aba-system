import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "../ui/table";
import { HeaderTable } from "./header-table";
import { BodyTable } from "./body-table";
import { PaginationController } from "./pagination-controller";

import { SearchState } from "./search-table";
import { ColumnChooserState } from "./column-chooser";
import { TopTableCommands } from "./top-table-commands";
import { BottomTableCommands } from "./bottom-table-commands";

interface IRenderTableProps<T extends unknown> {
  id: string;
  data: T[];
  refetch: (() => Promise<void>) | undefined;
  columns: ColumnDef<T>[];
  emptyMessage?: string;
  columnChooser?: ColumnChooserState;
  searchOptions?: SearchState;
  defaultSorting?: SortingState;
  defaultPagination?: PaginationState;
}

export function RenderTable<T>(props: IRenderTableProps<T>) {
  const {
    id,
    data,
    refetch,
    columns,
    emptyMessage,
    searchOptions,
    columnChooser,
    defaultSorting,
    defaultPagination = {
      pageSize: 10,
      pageIndex: 0,
    },
  } = props;

  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: data.length,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <section id={id} className="h-full flex flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <TopTableCommands<T>
          table={table}
          refetch={refetch}
          searchOptions={searchOptions}
          columnChooser={columnChooser}
        />

        <Table>
          <HeaderTable<T> table={table} />
          <BodyTable<T> emptyMessage={emptyMessage} table={table} />
        </Table>
      </div>

      <BottomTableCommands<T> table={table} />
    </section>
  );
}
