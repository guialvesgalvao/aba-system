import { Table } from "@tanstack/react-table";
import { ColumnChooser, ColumnChooserState } from "./column-chooser";
import { SearchState, SearchTable } from "./search-table";
import { RefetchButton } from "./refetch-button";

interface ITopCommandsProps<T> {
  table: Table<T>;
  refetch: (() => Promise<void>) | undefined;
  columnChooser?: ColumnChooserState;
  searchOptions?: SearchState;
}

export function TopTableCommands<T>(props: ITopCommandsProps<T>) {
  const { table, refetch, columnChooser, searchOptions } = props;

  return (
    <div className="flex justify-between mb-2">
      {searchOptions && <SearchTable<T> table={table} {...searchOptions} />}

      <div className="flex items-center gap-2">
        {/* {refetch && <RefetchButton refetch={refetch} />} */}
        {columnChooser && <ColumnChooser<T> table={table} {...columnChooser} />}
      </div>
    </div>
  );
}
