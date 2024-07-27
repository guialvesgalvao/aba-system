import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent } from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generatePaginationPages } from "@/shared/helpers/table-helper/table-helper";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface IPaginationButtonsProps<T> {
  table: Table<T>;
}

export function PaginationButtons<T>(
  props: Readonly<IPaginationButtonsProps<T>>
) {
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
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant={pageIndex === page - 1 ? "outline" : "ghost"}
              key={"page-button" + page.toString()}
              onClick={() => table.setPageIndex(page - 1)}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              {page}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ir para página {page}</TooltipContent>
        </Tooltip>
      );
    });
  }

  return (
    <Pagination className="w-fit">
      <PaginationContent className="flex items-center flex-wrap">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Voltar para primeira página</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={!table.getCanPreviousPage()}
              onClick={table.previousPage}
            >
              <ChevronLeftIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Página anterior</TooltipContent>
        </Tooltip>

        {createPageButtons(pageIndex)}

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={!table.getCanNextPage()}
              onClick={table.nextPage}
            >
              <ChevronRightIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Próxima página</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ir para última página</TooltipContent>
        </Tooltip>
      </PaginationContent>
    </Pagination>
  );
}
