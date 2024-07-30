import { Table } from "@tanstack/react-table";
import { ColumnChooser, ColumnChooserState } from "./column-chooser";
import { SearchState, SearchTable } from "./search-table";
import {
  ColumnFilterController,
  ColumnFilterState,
} from "./column-filter-controller/column-filter-controller";
import { ResetFilterButton } from "./reset-filter-button";

interface IToolbarTableCommandsProps<T> {
  table: Table<T>;
  refetch: (() => Promise<void>) | undefined;
  columnChooser?: ColumnChooserState;
  columnFilter?: ColumnFilterState;
  searchOptions?: SearchState;
}

export function ToolbarTableCommands<T>(
  props: Readonly<IToolbarTableCommandsProps<T>>
) {
  const { table, columnChooser, columnFilter, searchOptions } = props;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center flex-wrap justify-between mb-2 gap-2">
      <div className="flex gap-2">
        {searchOptions && <SearchTable<T> table={table} {...searchOptions} />}

        {columnFilter && (
          <ColumnFilterController<T>
            table={table}
            columns={columnFilter.columns}
          />
        )}

        {isFiltered && <ResetFilterButton<T> table={table} />}
      </div>

      <div className="flex items-center gap-2">
        {columnChooser && <ColumnChooser<T> table={table} {...columnChooser} />}
      </div>
    </div>
  );
}
