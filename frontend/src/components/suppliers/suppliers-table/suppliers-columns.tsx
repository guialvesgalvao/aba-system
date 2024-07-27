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
import { Supplier } from "@/shared/factories/suppliers-factory";
import { CNPJ } from "@/shared/helpers/cnpj-helper/cnpj-helper";
import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getSupplierTextByStatus,
  getBadgeColorBasedOnStatus,
  getSupplierDescriptionByStatus,
} from "@/shared/helpers/suppliers-helper/suppliers-helper";

import { SupplierStatus } from "@/shared/types/suppliers-types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const columns: ColumnDef<Supplier>[] = [
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
    header: ({ column }) => (
      <SortingColumn<Supplier> column={column} text="ID" />
    ),
    accessorKey: "id",
  },
  {
    header: ({ column }) => (
      <SortingColumn<Supplier> column={column} text="Nome" />
    ),
    accessorKey: "name",
  },
  {
    header: ({ column }) => (
      <SortingColumn<Supplier> column={column} text="CNPJ" />
    ),
    accessorKey: "cnpj",
    enableSorting: true,
    enableResizing: true,
    cell({ row }) {
      const value: string = row.getValue("cnpj");
      const cnpj = new CNPJ(value).formatCNPJ();

      return (
        <Tooltip delayDuration={400}>
          <TooltipTrigger>{cnpj}</TooltipTrigger>
          <TooltipContent className="max-w-80">{cnpj ?? ""}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Supplier> column={column} text="Status" />
    ),
    accessorKey: "status",
    cell({ row }) {
      const status: SupplierStatus = row.getValue("status");

      return (
        <StatusBadge
          text={getSupplierTextByStatus(status)}
          className={getBadgeColorBasedOnStatus(status)}
          description={getSupplierDescriptionByStatus(status)}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Supplier> column={column} text="Criado em" />
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
      <SortingColumn<Supplier> column={column} text="Última modificação em" />
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
