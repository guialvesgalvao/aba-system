import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { getHeaderName } from "@/shared/helpers/table-helper/table-helper";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

interface IColumnChooserProps<T> {
  table: Table<T>;
  text?: string;
}

export interface ColumnChooserState
  extends Omit<IColumnChooserProps<unknown>, "table"> {}

export function ColumnChooser<T>(props: Readonly<IColumnChooserProps<T>>) {
  const { table, text } = props;

  const columnsWithCanHide = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          {text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {columnsWithCanHide.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {getHeaderName<T>(column)}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
