import { Row, flexRender } from "@tanstack/react-table";
import { TableRow, TableCell } from "../ui/table";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface IRowTableProps<T> {
  row: Row<T>;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
}

export function RowTable<T>(props: Readonly<IRowTableProps<T>>) {
  const { row, renderSubComponent } = props;

  return (
    <Fragment key={row.id}>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className={cn(row.getIsExpanded() && "border-b-0")}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>

      {row.getIsExpanded() && renderSubComponent && (
        <TableRow data-state={row.getIsSelected() && "selected"}>
          <TableCell colSpan={row.getVisibleCells().length}>
            {renderSubComponent({ row })}
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}
