import { Column } from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowDownNarrowWide } from "lucide-react";

interface ISortingColumnProps<T> {
  column: Column<T, unknown>;
  text: string;
}

export function SortingColumn<T>(props: Readonly<ISortingColumnProps<T>>) {
  const { column, text } = props;

  const isAsc = column.getIsSorted() === "asc";

  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center cursor-pointer gap min-w-max"
    >
      {text}

      {column.getIsSorted() ? <SortingIcon isAsc={isAsc} /> : null}
    </button>
  );
}

interface ISortingIconProps {
  isAsc: boolean;
}

function SortingIcon(props: Readonly<ISortingIconProps>) {
  const { isAsc } = props;

  if (isAsc) {
    return <ArrowDownNarrowWide className="ml-2 h-4 w-4" />;
  }

  return <ArrowDownWideNarrow className="ml-2 h-4 w-4" />;
}
