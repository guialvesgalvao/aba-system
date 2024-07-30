import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";

interface IResetFilterButtonProps<T> {
  table: Table<T>;
}

export function ResetFilterButton<T>(
  props: Readonly<IResetFilterButtonProps<T>>
) {
  const { table } = props;

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => table.resetColumnFilters()}
      className="h-8 px-2 lg:px-3"
    >
      Limpar filtros
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}
