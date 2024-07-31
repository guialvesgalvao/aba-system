import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StaticColumn } from "./static-table";

interface IStaticTableHeaderProps<TData> {
  columns: StaticColumn<TData>[];
}

export function StaticTableHeader<TData>(
  props: Readonly<IStaticTableHeaderProps<TData>>
) {
  const { columns } = props;

  function renderHeads(columns: StaticColumn<TData>[]) {
    return columns.map((column, index) => (
      <TableHead key={"static-table-column" + index}>{column.header}</TableHead>
    ));
  }

  return (
    <TableHeader>
      <TableRow>{renderHeads(columns)}</TableRow>
    </TableHeader>
  );
}
