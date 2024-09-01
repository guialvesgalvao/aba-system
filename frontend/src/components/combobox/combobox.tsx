import * as React from "react";
import { ChevronsUpDown, OctagonAlert } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { OptionValue } from "./interface";
import { ComboboxCommand } from "./combobox-command";
import { useMemo } from "react";

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

  const currentLabel = useMemo(
    () =>
      options.find((option) => (value ? option?.value === value.value : false))
        ?.label,
    [options, value]
  );

  const handleChange = React.useCallback(
    (option: OptionValue) => {
      setValue(option);

      if (onChange) {
        onChange(option);
      }
    },
    [onChange]
  );

  function getIcon() {
    if (isFetching) {
      return <LoadingSpinner className="h-5 w-5" />;
    }

    if (isError) {
      return <OctagonAlert className="h-5 w-5" />;
    }

    return <ChevronsUpDown className="h-5 w-5" />;
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
        <ComboboxCommand
          heading={heading}
          value={value}
          options={options}
          strings={strings}
          onChange={handleChange}
        />
      </PopoverContent>
    </Popover>
  );
}
