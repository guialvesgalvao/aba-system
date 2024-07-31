import { Table, TableCaption } from "@/components/ui/table";
import { StaticTableHeader } from "./static-table-header";
import { StaticTableBody } from "./static-table-body";

type StaticCell = JSX.Element | string | number | null | undefined;

export type StaticColumn<TData> = {
  id: keyof TData;
  header: string | JSX.Element;
  cell?: (row: TData) => StaticCell;
};

interface IStaticTableProps<TData> {
  caption?: string;
  headers: StaticColumn<TData>[];
  data: TData[];
  rowConfig?: {
    className?: string;
  };
}

export function StaticTable<TData>(props: Readonly<IStaticTableProps<TData>>) {
  const {
    caption,
    headers,
    data,
    rowConfig = {
      className: "h-14",
    },
  } = props;

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <StaticTableHeader columns={headers} />
      <StaticTableBody columns={headers} data={data} config={rowConfig} />
    </Table>
  );
}
