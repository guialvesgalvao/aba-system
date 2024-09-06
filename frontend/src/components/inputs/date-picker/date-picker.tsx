import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";

type DateStrings = {
  button: string;
  placeholder: string;
};

interface IDatePickerProps {
  name: string;
  selectedDate?: Date;
  onChange?: (date: Date | undefined) => void;
  strings?: DateStrings;
  isError?: boolean;
}

export function DatePicker(props: Readonly<IDatePickerProps>) {
  const {
    name,
    selectedDate,
    onChange,
    strings = {
      button: "Escolha a data",
      placeholder: "Escolha uma data",
    },
    isError,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined | null>(
    selectedDate ?? null
  );

  React.useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }

    if (!selectedDate) {
      setDate(null);
    }
  }, [selectedDate]);

  const handleChange = React.useCallback(
    (date: Date | undefined) => {
      setDate(date);

      if (onChange) {
        onChange(date);
      }
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            isError && "border-destructive",
            open && "border-primary"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", {
              locale: ptBR,
            })
          ) : (
            <span>{strings.button}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          id={name}
          mode="single"
          selected={date ?? undefined}
          onSelect={(event) => handleChange(event)}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
