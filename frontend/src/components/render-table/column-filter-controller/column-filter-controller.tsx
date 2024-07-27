import { Table } from "@tanstack/react-table";
import { ColumnFilterButton } from "./column-filter-button";

export type ColumnFilterOptionsSchema = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type ColumnFilter = {
  id: string;
  title: string;
  options: ColumnFilterOptionsSchema[];
};

interface IColumnFilterProps<T> {
  table: Table<T>;
  columns?: ColumnFilter[];
}

export interface ColumnFilterState
  extends Omit<IColumnFilterProps<unknown>, "table"> {}

export function ColumnFilterController<T>(
  props: Readonly<IColumnFilterProps<T>>
) {
  const { table, columns } = props;

  function renderButtons(column: ColumnFilter) {
    const columnTable = table.getColumn(column.id);

    if (!columnTable) {
      return null;
    }

    return (
      <ColumnFilterButton<T>
        key={"column-filter" + column.id}
        column={columnTable}
        title={column.title}
        options={column.options}
      />
    );
  }

  return (
    <div className="flex flex-wrap">
      {columns?.map((column) => renderButtons(column))}
    </div>
  );
}
