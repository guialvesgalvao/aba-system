import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { ColumnFilterOptionsSchema } from "./column-filter-controller";
import { ColumnFilterButtonWithValue } from "./column-filter-button-with-value";
import { ColumnFilterCommands } from "./column-filter-commands";

interface IColumnFilterButtonProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  options: ColumnFilterOptionsSchema[];
}

export function ColumnFilterButton<T>(
  props: Readonly<IColumnFilterButtonProps<T, unknown>>
) {
  const { column, title, options } = props;
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <ColumnFilterButtonWithValue
              selectedValues={selectedValues}
              options={options}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <ColumnFilterCommands
          column={column}
          title={title}
          facets={facets}
          selectedValues={selectedValues}
          options={options}
        />
      </PopoverContent>
    </Popover>
  );
}
