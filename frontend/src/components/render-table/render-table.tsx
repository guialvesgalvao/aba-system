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
import { useState } from "react";
import { HeaderTable } from "./header-table";
import { BodyTable } from "./body-table";
import { PaginationController } from "./pagination-controller";

import { SearchState, SearchTable } from "./search-table";
import { ColumnChooser, ColumnChooserState } from "./column-chooser";

interface IRenderTableProps<T extends unknown> {
  data: T[];
  columns: ColumnDef<T>[];
  emptyMessage?: string;
  columnChooser?: ColumnChooserState;
  searchOptions?: SearchState;
  defaultSorting?: SortingState;
  defaultPagination?: PaginationState;
}

export function RenderTable<T>(props: IRenderTableProps<T>) {
  const {
    data,
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
    <div className="flex flex-col">
      <div className="flex justify-between mb-2">
        {searchOptions && <SearchTable<T> table={table} {...searchOptions} />}
        {columnChooser && <ColumnChooser<T> table={table} {...columnChooser} />}
      </div>

      <div className="flex flex-col gap-2">
        <Table>
          <HeaderTable<T> table={table} />
          <BodyTable<T> emptyMessage={emptyMessage} table={table} />
        </Table>

        <PaginationController<T> table={table} />
      </div>
    </div>
  );
}
