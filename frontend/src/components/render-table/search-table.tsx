import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

export interface ISearchTableProps<T> {
  table: Table<T>;
  columnId: string;
  placeholder?: string;
}

export interface SearchState
  extends Omit<ISearchTableProps<unknown>, "table"> {}

export function SearchTable<T>(props: ISearchTableProps<T>) {
  const { table, columnId, placeholder } = props;

  return (
    <div className="w-full max-w-80 flex items-start">
      <Input
        placeholder={placeholder}
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
