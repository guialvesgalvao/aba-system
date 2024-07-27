import { TableBody, TableCell, TableRow } from "../ui/table";
import { StaticColumn } from "./static-table";

export type RowConfig = {
  className?: string;
};

interface IStaticTableBodyProps<TData> {
  columns: StaticColumn<TData>[];
  data: TData[];
  config: RowConfig;
}

export function StaticTableBody<TData>(
  props: Readonly<IStaticTableBodyProps<TData>>
) {
  const { columns, data, config } = props;
  const { className } = config;

  function renderRow(data: TData[]) {
    return data?.map((row, index) => (
      <TableRow className={className} key={"static-row" + index}>
        {renderCell(row, index)}
      </TableRow>
    ));
  }

  function renderCell(row: TData, index: number) {
    return columns?.map((column) => {
      const id = column.id as string;
      const value = row[column.id] as string;
      const cell = column.cell ? column.cell(row) : value;

      return <TableCell key={"static-row-cell" + id + index}>{cell}</TableCell>;
    });
  }

  return <TableBody className={className}>{renderRow(data)}</TableBody>;
}
