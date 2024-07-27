import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column, SortDirection } from "@tanstack/react-table";
import { ArrowUpIcon } from "lucide-react";

interface ISortingColumnProps<T> {
  column: Column<T, unknown>;
  text: string;
  className?: string;
}

export function SortingColumn<T>(props: Readonly<ISortingColumnProps<T>>) {
  const { column, text, className } = props;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{text}</span>
            {<SortingIcon direction={column.getIsSorted()} />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Esconder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface ISortingIconProps {
  direction: false | SortDirection;
}

function SortingIcon(props: Readonly<ISortingIconProps>) {
  const { direction } = props;

  if (direction === "desc") {
    return <ArrowDownIcon className="ml-2 h-4 w-4" />;
  }

  if (direction === "asc") {
    return <ArrowUpIcon className="ml-2 h-4 w-4" />;
  }

  return <CaretSortIcon className="ml-2 h-4 w-4" />;
}
