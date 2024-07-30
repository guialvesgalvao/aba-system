import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { ptBR } from "date-fns/locale";

interface IDateRangePickerProps {
  fromDate: Date;
  toDate?: Date;
  className?: string;
}

type DateElement = Date | undefined;

export function DateRangePicker(props: Readonly<IDateRangePickerProps>) {
  const { className, fromDate, toDate } = props;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: fromDate,
    to: toDate,
  });

  function handleDateSelect(range: DateRange | undefined) {
    if (!range) return;

    setDate(range);
  }

  function getFormattedDate(from: DateElement, to: DateElement) {
    if (!from) {
      return <span>Pick a date</span>;
    }

    if (!to) {
      return format(from, "LLL dd, y");
    }

    return (
      <>
        {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
      </>
    );
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {getFormattedDate(date?.from, date?.to)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            locale={ptBR}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(event) => handleDateSelect(event)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
