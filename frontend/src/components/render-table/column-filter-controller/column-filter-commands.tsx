import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { ColumnFilterOptionsSchema } from "./column-filter-controller";
import { Column } from "@tanstack/react-table";

interface IColumnFilterCommandsProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  facets: Map<any, number> | undefined;
  selectedValues: Set<string>;
  options: ColumnFilterOptionsSchema[];
}

export function ColumnFilterCommands<T>(
  props: Readonly<IColumnFilterCommandsProps<T, unknown>>
) {
  const { column, title, selectedValues, facets, options } = props;

  function handleOnSelect(isSelected: boolean, value: string) {
    if (isSelected) {
      selectedValues.delete(value);
    } else {
      selectedValues.add(value);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  }

  return (
    <Command>
      <CommandInput placeholder={title} />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const isSelected = selectedValues.has(option.value);

            return (
              <CommandItem
                key={option.value}
                onSelect={() => handleOnSelect(isSelected, option.value)}
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <CheckIcon className={cn("h-4 w-4")} />
                </div>
                {option.icon && (
                  <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{option.label}</span>
                {facets?.get(option.value) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option.value)}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {selectedValues.size > 0 && <ClearCommand<T> column={column} />}
      </CommandList>
    </Command>
  );
}

interface IClearCommandProps<T> {
  column: Column<T, unknown>;
}
function ClearCommand<T>(props: Readonly<IClearCommandProps<T>>) {
  const { column } = props;

  return (
    <>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem
          onSelect={() => column?.setFilterValue(undefined)}
          className="justify-center text-center"
        >
          Resetar filtros
        </CommandItem>
      </CommandGroup>
    </>
  );
}
