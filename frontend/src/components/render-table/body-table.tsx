import { Table } from "@tanstack/react-table";
import { TableBody } from "../ui/table";
import { EmptyTableRow } from "./empty-table-row";
import { RowTable } from "./row-table";

interface IBodyTableProps<T> {
  table: Table<T>;
  emptyMessage?: string;
}

export function BodyTable<T>(props: IBodyTableProps<T>) {
  const { table, emptyMessage = "Nenhum item encontrado" } = props;

  // Se não houver linhas, exibe a mensagem de tabela vazia
  if (!table.getRowModel().rows?.length)
    return (
      <EmptyTableRow
        columnsLength={table.getAllColumns().length}
        message={emptyMessage}
      />
    );

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <RowTable<T> key={row.id} row={row} />
      ))}
    </TableBody>
  );
}
