import { useContext } from "react";
import { StaticTableContext } from "../static-table-provider";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { StaticColumn } from "../static-table";

interface IStaticSortColumnProps<TData> {
  column: StaticColumn<TData>;
}

export function StaticSortColumn<TData>(
  props: Readonly<IStaticSortColumnProps<TData>>
) {
  const { column } = props;

  const { defaultSorting } = useContext(StaticTableContext);

  const isSorted = defaultSorting?.id === column.id;
  const isDesc = defaultSorting?.desc ?? false;

  return (
    <div className="flex items-center gap-2">
      {column.header}
      {isSorted && (
        <>
          {isDesc ? (
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          ) : (
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          )}
        </>
      )}
    </div>
  );
}
