import { Column } from "@tanstack/react-table";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

interface ISortingColumnProps<T> {
  column: Column<T, unknown>;
  text: string;
}

export function SortingColumn<T>(props: ISortingColumnProps<T>) {
  const { column, text } = props;
  
  return (
    <div
      className="flex items-center cursor-pointer gap"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {text}

      <>
        {column.getIsSorted() ? (
          column.getIsSorted() === "asc" ? (
            <ArrowDownAZ className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />
          )
        ) : null}
      </>
    </div>
  );
}
