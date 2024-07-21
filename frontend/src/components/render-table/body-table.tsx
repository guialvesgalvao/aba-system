import { Row, Table } from "@tanstack/react-table";
import { TableBody } from "../ui/table";
import { EmptyTableRow } from "./empty-table-row";
import { RowTable } from "./row-table";

interface IBodyTableProps<T> {
  table: Table<T>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  emptyMessage?: string;
}

export function BodyTable<T>(props: Readonly<IBodyTableProps<T>>) {
  const {
    table,
    emptyMessage = "Nenhum item encontrado",
    renderSubComponent,
  } = props;

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
        <RowTable<T>
          key={row.id}
          row={row}
          renderSubComponent={renderSubComponent}
        />
      ))}
    </TableBody>
  );
}
