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
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  strings?: DateStrings;
}

export function DatePicker(props: Readonly<IDatePickerProps>) {
  const {
    value,
    onChange,
    strings = {
      button: "Escolha a data",
      placeholder: "Escolha uma data",
    },
  } = props;

  const [date, setDate] = React.useState<Date | undefined | null>(
    value ?? null
  );

  function handleChange(date: Date | undefined) {
    setDate(date);

    if (onChange) {
      onChange(date);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
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
