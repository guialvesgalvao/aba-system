import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StaticColumn } from "./static-table";

interface IStaticTableHeaderProps<TData> {
  columns: StaticColumn<TData>[];
  hasBorder?: boolean;
}

export function StaticTableHeader<TData>(
  props: Readonly<IStaticTableHeaderProps<TData>>
) {
  const { columns, hasBorder } = props;

  function renderHeads(columns: StaticColumn<TData>[]) {
    return columns.map((column, index) => (
      <TableHead key={"static-table-column" + index}>{column.header}</TableHead>
    ));
  }

  return (
    <TableHeader className={`${hasBorder ? "bg-gray-200 border-b border-gray-300" : ""}`}>
      <TableRow>{renderHeads(columns)}</TableRow>
    </TableHeader>
  );
}
