import { Table } from "@tanstack/react-table";
import { PaginationController } from "./pagination-controller/pagination-controller";

interface IBottomCommandsProps<T> {
  table: Table<T>;
  sizes: number[];
}

export function BottomTableCommands<T>(props: IBottomCommandsProps<T>) {
  const { table, sizes } = props;

  return (
    <div className="w-full flex items-center justify-end">
      <PaginationController<T> table={table} sizes={sizes} />
    </div>
  );
}
