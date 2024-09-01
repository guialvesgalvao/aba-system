import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { OptionValue } from "./interface";
import { ComboboxStrings } from "./combobox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { groupByHeading } from "@/shared/helpers/inputs-helper/combobox-helper";
import { useMemo } from "react";

interface IComboboxCommandProps {
  heading?: {
    enabled?: boolean;
  };

  value: OptionValue | null;
  options: OptionValue[];
  strings: ComboboxStrings;

  onChange: (value: OptionValue) => void;
}

export function ComboboxCommand(props: Readonly<IComboboxCommandProps>) {
  const {
    heading = { enabled: false },
    options,
    value,
    onChange,
    strings,
  } = props;

  const items = useMemo(() => {
    if (heading.enabled) {
      return generateOptionsWithHeading(groupByHeading(options), value);
    }

    return generateOptions(options, value);
  }, [heading, options, value]);

  function generateOptions(
    options: OptionValue[],
    selectedOption: OptionValue | null
  ) {
    return options.map((option) => (
      <CommandItem
        key={option.value}
        value={option.label}
        onSelect={() => onChange(option)}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            selectedOption?.value === option.value ? "opacity-100" : "opacity-0"
          )}
        />
        {option.label}
      </CommandItem>
    ));
  }

  function generateOptionsWithHeading(
    hashOptions: Record<string, OptionValue[]>,
    selectedOption: OptionValue | null
  ) {
    return Object.entries(hashOptions).map(([heading, options]) => {
      return (
        <CommandGroup key={heading} heading={heading}>
          {generateOptions(options, selectedOption)}
        </CommandGroup>
      );
    });
  }

  return (
    <Command>
      <CommandInput placeholder={strings.search} />
      <CommandList>
        <CommandEmpty>{strings.empty}</CommandEmpty>
        <CommandGroup>{items}</CommandGroup>
      </CommandList>
    </Command>
  );
}
