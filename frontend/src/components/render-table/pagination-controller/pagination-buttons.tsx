import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { generatePaginationPages } from "@/shared/helpers/table-helper/table-helper";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

interface IPaginationButtonsProps<T> {
  table: Table<T>;
}

export function PaginationButtons<T>(props: IPaginationButtonsProps<T>) {
  const { table } = props;

  const rowCount = table.getRowCount();
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;

  function createPageButtons(page: number) {
    const pages = generatePaginationPages(
      {
        page,
        total: rowCount,
        size: pageSize,
      },
      3
    );

    return pages.map((page) => {
      return (
        <PaginationItem key={page}>
          <PaginationLink
            onClick={() => table.setPageIndex(page - 1)}
            size="sm"
            className="gap-1 cursor-pointer"
            isActive={pageIndex === page - 1}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  }

  return (
    <Pagination className="w-fit">
      <PaginationContent className="flex items-center flex-wrap">
        <PaginationItem>
          <Button
            variant="ghost"
            disabled={!table.getCanPreviousPage()}
            onClick={table.previousPage}
          >
            Anterior
          </Button>
        </PaginationItem>

        {createPageButtons(pageIndex)}

        <PaginationItem>
          <Button
            variant="ghost"
            disabled={!table.getCanNextPage()}
            onClick={table.nextPage}
          >
            Próximo
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
