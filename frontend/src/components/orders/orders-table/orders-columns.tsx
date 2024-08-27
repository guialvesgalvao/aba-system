import { SortingColumn } from "@/components/render-table/utilities/sorting-column";
import { SubComponentButton } from "@/components/render-table/utilities/sub-component-button";
import { StatusBadge } from "@/components/status-badge/status-badge";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Order } from "@/shared/factories/orders-factory";
import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getOrderTextByStatus,
  getBadgeColorBasedOnStatus,
  getOrderDescriptionByStatus,
} from "@/shared/helpers/orders-helper/orders-helper";
import { getShortedText } from "@/shared/helpers/table-helper/table-helper";
import { OrderStatus } from "@/shared/types/orders-types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const columns: ColumnDef<Order>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();

      return row.getCanExpand() ? (
        <SubComponentButton
          isExpanded={isExpanded}
          onClick={row.getToggleExpandedHandler()}
        >
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </SubComponentButton>
      ) : null;
    },
  },
  {
    header: ({ column }) => <SortingColumn<Order> column={column} text="ID" />,
    accessorKey: "id",
  },
  {
    header: ({ column }) => (
      <SortingColumn<Order> column={column} text="Cliente" />
    ),
    accessorKey: "client_id",
  },
  {
    header: ({ column }) => (
      <SortingColumn<Order> column={column} text="Status" />
    ),
    accessorKey: "status",
    cell({ row }) {
      const status: OrderStatus = row.getValue("status");

      return (
        <StatusBadge
          text={getOrderTextByStatus(status)}
          className={getBadgeColorBasedOnStatus(status)}
          description={getOrderDescriptionByStatus(status)}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: "Valor Total de Custo",
    accessorKey: "total_cost_value",
    enableSorting: false,
    enableResizing: true,
    cell({ row }) {
      const total_cost_value: number | undefined = row.getValue("total_cost_value");

      return (
        <span>R$ {total_cost_value}</span>
      );
    },
  },
  {
    header: "Valor Total de Venda",
    accessorKey: "total_sale_value",
    enableSorting: false,
    enableResizing: true,
    cell({ row }) {
      const total_sale_value: number | undefined = row.getValue("total_sale_value");

      return (
        <span>R$ {total_sale_value}</span>
      );
    },
  },

  {
    header: "Observações",
    accessorKey: "extra_details",
    enableSorting: false,
    enableResizing: true,
    cell({ row }) {
      const extra_details: string | undefined = row.getValue("extra_details");

      return (
        <Tooltip delayDuration={400}>
          <TooltipTrigger>{getShortedText(30, extra_details)}</TooltipTrigger>
          <TooltipContent className="max-w-80">
            {extra_details ?? ""}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Order> column={column} text="Criado em" />
    ),
    accessorKey: "createdDate",

    cell({ row }) {
      const date: Date = row.getValue("createdDate");

      const text = getFormattedDynamicText(date, {
        updatedNow: "Agora mesmo",
        updatedAgo: "Criado há {minutes}",
        updatedAt: "às",
      });

      return (
        <Tooltip delayDuration={1000}>
          <TooltipTrigger>{text}</TooltipTrigger>
          <TooltipContent className="max-w-80">
            {getFullFormattedDate(date)}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Order> column={column} text="Última modificação em" />
    ),
    accessorKey: "modifiedDate",
    meta: {
      label: "Última modificação",
    },
    enableSorting: true,
    cell({ row }) {
      const date: Date = row.getValue("modifiedDate");

      const text = getFormattedDynamicText(date, {
        updatedNow: "Agora mesmo",
        updatedAgo: "Modificado há {minutes}",
        updatedAt: "às",
      });

      return (
        <Tooltip delayDuration={1000}>
          <TooltipTrigger>{text}</TooltipTrigger>
          <TooltipContent className="max-w-80">
            {getFullFormattedDate(date)}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: () => <span className="sr-only">Ações</span>,
    accessorKey: "actions",
    enableHiding: false,
    enableResizing: false,
    enableSorting: false,
    enableColumnFilter: false,
    cell({ row }) {
      const [searchParams, setSearchParams] = useSearchParams();
      const id: number = row.getValue("id");

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button type="button" aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <DialogTrigger
                className="w-full"
                onClick={() => {
                  searchParams.set("formId", id.toString());
                  setSearchParams(searchParams);
                }}
              >
                Editar
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
