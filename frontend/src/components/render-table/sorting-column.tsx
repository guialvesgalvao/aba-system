import { Column } from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowDownNarrowWide } from "lucide-react";

interface ISortingColumnProps<T> {
  column: Column<T, unknown>;
  text: string;
}

export function SortingColumn<T>(props: ISortingColumnProps<T>) {
  const { column, text } = props;

  const isAsc = column.getIsSorted() === "asc";

  return (
    <div
      className="flex items-center cursor-pointer gap"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {text}

      {column.getIsSorted() ? <SortingIcon isAsc={isAsc} /> : null}
    </div>
  );
}

function SortingIcon(props: { isAsc: boolean }) {
  const { isAsc } = props;

  if (isAsc) {
    return <ArrowDownNarrowWide className="ml-2 h-4 w-4" />;
  }

  return <ArrowDownWideNarrow className="ml-2 h-4 w-4" />;
}
