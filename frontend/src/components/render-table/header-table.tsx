import { TableHeader } from "../ui/table";
import { Table } from "@tanstack/react-table";
import { ColumnRowTable } from "./column-row-table";

interface IHeaderTableProps<T> {
  table: Table<T>;
}

export function HeaderTable<T>(props: IHeaderTableProps<T>) {
  const { table } = props;

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <ColumnRowTable<T> key={headerGroup.id} headerGroup={headerGroup} />
      ))}
    </TableHeader>
  );
}
