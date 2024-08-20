import { Table, TableCaption } from "@/components/ui/table";
import { StaticTableHeader } from "./static-table-header";
import { StaticTableBody } from "./static-table-body";
import { StaticTableContextProvider } from "./static-table-provider";

type StaticCell = JSX.Element | string | number | null | undefined;

export type StaticColumn<TData> = {
  id: keyof TData;
  header: string | JSX.Element;
  cell?: (row: TData) => StaticCell;
};

export type StaticSortState<TData> = {
  id: keyof TData;
  desc?: boolean;
};

export interface IStaticTableProps<TData> {
  caption?: string;
  headers: StaticColumn<TData>[];
  data: TData[];
  hasBorder?: boolean;
  rowConfig?: {
    className?: string;
  };

  defaultSorting?: StaticSortState<TData>;
}

export function StaticTable<TData>(props: Readonly<IStaticTableProps<TData>>) {
  const {
    caption,
    headers,
    hasBorder,
    data,
    rowConfig = {
      className: "h-14",
    },
    defaultSorting,
  } = props;

  return (
    <StaticTableContextProvider<TData> table={props}>
      <Table className={`${hasBorder ? "border border-gray-300" : ""}`}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <StaticTableHeader hasBorder={hasBorder} columns={headers} />
        <StaticTableBody
          columns={headers}
          data={data}
          config={rowConfig}
          defaultSorting={defaultSorting}
        />
      </Table>
    </StaticTableContextProvider>
  );
}
