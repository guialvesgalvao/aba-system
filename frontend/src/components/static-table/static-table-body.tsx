import { useMemo } from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { StaticColumn, StaticSortState } from "./static-table";

export type RowConfig = {
  className?: string;
};

interface IStaticTableBodyProps<TData> {
  columns: StaticColumn<TData>[];
  data: TData[];
  config: RowConfig;

  defaultSorting?: StaticSortState<TData>;
}

export function StaticTableBody<TData>(
  props: Readonly<IStaticTableBodyProps<TData>>
) {
  const { columns, data, config, defaultSorting } = props;
  const { className } = config;

  const sortedData = useMemo(() => {
    if (!defaultSorting) return data;

    const { id, desc } = defaultSorting;
    const sorted = [...data].sort((a, b) => {
      if (a[id] < b[id]) return desc ? 1 : -1;
      if (a[id] > b[id]) return desc ? -1 : 1;
      return 0;
    });

    return sorted;
  }, [data, defaultSorting]);

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

  return <TableBody className={className}>{renderRow(sortedData)}</TableBody>;
}
