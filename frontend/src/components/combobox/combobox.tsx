import * as React from "react";
import { Check, ChevronsUpDown, OctagonAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

export type OptionValue = {
  value: string;
  label: string;

  heading?: string;
};

export type ComboboxStrings = {
  placeholder?: string;
  search?: string;
  empty?: string;
};

export interface IComboboxProps {
  heading?: {
    enabled?: boolean;
  };

  isError?: boolean;
  isFetching?: boolean;

  onChange?: (value: OptionValue) => void;

  options: OptionValue[];
  strings?: ComboboxStrings;

  errorMessage?: string;
}

export function Combobox(props: Readonly<IComboboxProps>) {
  const {
    heading = {
      enabled: false,
    },
    options,
    onChange,
    isError = false,
    isFetching = false,
    strings = {
      placeholder: "Procurar opções...",
      search: "Procurar...",
      empty: "Nenhum opção encontrada.",
    },
    errorMessage,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<OptionValue | null>(null);

  const currentLabel = options.find((option) =>
    value ? option?.value === value.value : false
  )?.label;

  function handleChange(option: OptionValue) {
    setValue(option);

    if (onChange) {
      onChange(option);
    }
  }

  function getIcon() {
    if (isFetching) {
      return <LoadingSpinner className="h-5 w-5" />;
    }

    if (isError) {
      return <OctagonAlert className="h-5 w-5" />;
    }

    return <ChevronsUpDown className="h-5 w-5" />;
  }

  function generateOptions(
    options: OptionValue[],
    selectedOption: OptionValue | null
  ) {
    return options.map(({ value, label }) => (
      <CommandItem
        key={value}
        value={value}
        onSelect={(currentValue) =>
          handleChange({ value: currentValue, label })
        }
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            selectedOption?.value === value ? "opacity-100" : "opacity-0"
          )}
        />
        {label}
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

  function groupByHeading(
    options: OptionValue[]
  ): Record<string, OptionValue[]> {
    const groupedOptions: Record<string, OptionValue[]> = {};

    options.forEach((option) => {
      if (option.heading) {
        if (!groupedOptions[option.heading]) {
          groupedOptions[option.heading] = [];
        }

        groupedOptions[option.heading].push(option);
      } else {
        if (!groupedOptions[""]) {
          groupedOptions[""] = [];
        }

        groupedOptions[""].push(option);
      }
    });

    return groupedOptions;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-between",
            isError && "text-destructive border-destructive",
            isFetching && "text-muted-foreground border-muted-foreground"
          )}
          disabled={isFetching || isError}
        >
          {errorMessage ?? currentLabel ?? strings.placeholder}
          {getIcon()}
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="p-0">
        <Command>
          <CommandInput placeholder={strings.search} />
          <CommandList>
            <CommandEmpty>{strings.empty}</CommandEmpty>
            <CommandGroup>
              {heading.enabled
                ? generateOptionsWithHeading(groupByHeading(options), value)
                : generateOptions(options, value)}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
