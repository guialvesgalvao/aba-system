import { Table } from "@tanstack/react-table";

import { PaginationButtons } from "./pagination-buttons";
import { PaginationCounter } from "./pagination-counter";
import { PaginationPageSize } from "./pagination-page-size";

interface IPaginationControllerProps<T> {
  table: Table<T>;
  sizes: number[];
}

export function PaginationController<T>(props: IPaginationControllerProps<T>) {
  const { table, sizes } = props;

  return (
    <div className="w-full flex items-center justify-between flex-wrap gap-4">
      <PaginationPageSize
        sizes={sizes}
        currentPageSize={table.getState().pagination.pageSize}
        setPageSize={table.setPageSize}
      />

      <div className="flex flex-wrap items-center gap-4">
        <PaginationCounter
          pageSize={table.getState().pagination.pageSize}
          pageIndex={table.getState().pagination.pageIndex}
          rowCount={table.getRowCount()}
        />

        <PaginationButtons<T> table={table} />
      </div>
    </div>
  );
}
