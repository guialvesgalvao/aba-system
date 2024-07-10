import { Table } from "@tanstack/react-table";
import { PaginationController } from "./pagination-controller";

interface IBottomCommandsProps<T> {
  table: Table<T>;
}

export function BottomTableCommands<T>(props: IBottomCommandsProps<T>) {
  const { table } = props;

  return (
    <div className="flex items-center justify-end">
      <PaginationController<T> table={table} />
    </div>
  );
}
