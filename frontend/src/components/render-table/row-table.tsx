import { Row, flexRender } from "@tanstack/react-table";
import { TableRow, TableCell } from "../ui/table";

interface IRowTableProps<T> {
  row: Row<T>;
}

export function RowTable<T>(props: IRowTableProps<T>) {
  const { row } = props;

  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
