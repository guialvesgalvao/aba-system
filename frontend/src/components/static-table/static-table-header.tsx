import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StaticColumn } from "./static-table";
import { StaticSortColumn } from "./utilities/static-sort-column";

interface IStaticTableHeaderProps<TData> {
  columns: StaticColumn<TData>[];
  hasBorder?: boolean;
}

export function StaticTableHeader<TData>(
  props: Readonly<IStaticTableHeaderProps<TData>>
) {
  const { columns, hasBorder } = props;

  function renderHeads(columns: StaticColumn<TData>[]) {
    return columns.map((column) => {
      return (
        <TableHead key={"static-table-column" + (column.id as string)}>
          <StaticSortColumn<TData> column={column} />
        </TableHead>
      );
    });
  }

  return (
    <TableHeader
      className={`${hasBorder ? "bg-gray-200 border-b border-gray-300" : ""}`}
    >
      <TableRow>{renderHeads(columns)}</TableRow>
    </TableHeader>
  );
}
