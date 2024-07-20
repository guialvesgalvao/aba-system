import { Table } from "@tanstack/react-table";
import { ColumnChooser, ColumnChooserState } from "./column-chooser";
import { SearchState, SearchTable } from "./search-table";

interface ITopCommandsProps<T> {
  table: Table<T>;
  refetch: (() => Promise<void>) | undefined;
  columnChooser?: ColumnChooserState;
  searchOptions?: SearchState;
}

export function TopTableCommands<T>(props: Readonly<ITopCommandsProps<T>>) {
  // Revisão Lucas Pedro, verificar 'refetch inutilizado'
  // const { table, refetch, columnChooser, searchOptions } = props;
  const { table, columnChooser, searchOptions } = props;

  return (
    <div className="flex items-center flex-wrap justify-between mb-2 gap-2">
      {searchOptions && <SearchTable<T> table={table} {...searchOptions} />}

      <div className="flex items-center gap-2">
        {columnChooser && <ColumnChooser<T> table={table} {...columnChooser} />}
      </div>
    </div>
  );
}
