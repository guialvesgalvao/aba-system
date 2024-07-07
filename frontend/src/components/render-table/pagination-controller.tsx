import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface IPaginationControllerProps<T> {
  table: Table<T>;
}

export function PaginationController<T>(props: IPaginationControllerProps<T>) {
  const { table } = props;

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próximo
      </Button>
    </div>
  );
}
