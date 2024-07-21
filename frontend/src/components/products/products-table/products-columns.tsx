import { SortingColumn } from "@/components/render-table/utilities/sorting-column";
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
import { Product } from "@/shared/factories/products-factory";
import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getProductTextByStatus,
  getBadgeColorBasedOnStatus,
  getProductDescriptionByStatus,
} from "@/shared/helpers/products-helper/products-helper";
import { getShortedText } from "@/shared/helpers/table-helper/table-helper";
import { ProductStatus } from "@/shared/types/products-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const columns: ColumnDef<Product>[] = [
  {
    header: ({ column }) => (
      <SortingColumn<Product> column={column} text="ID" />
    ),
    accessorKey: "id",
  },
  {
    header: ({ column }) => (
      <SortingColumn<Product> column={column} text="Nome" />
    ),
    accessorKey: "name",
  },
  {
    header: "Descrição",
    accessorKey: "description",
    enableSorting: false,
    enableResizing: true,
    cell({ row }) {
      const description: string | undefined = row.getValue("description");

      return (
        <Tooltip delayDuration={400}>
          <TooltipTrigger>{getShortedText(30, description)}</TooltipTrigger>
          <TooltipContent className="max-w-80">
            {description ?? ""}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Product> column={column} text="Status" />
    ),
    accessorKey: "status",
    cell({ row }) {
      const status: ProductStatus = row.getValue("status");

      return (
        <StatusBadge
          text={getProductTextByStatus(status)}
          className={getBadgeColorBasedOnStatus(status)}
          description={getProductDescriptionByStatus(status)}
        />
      );
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<Product> column={column} text="Criado em" />
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
      <SortingColumn<Product> column={column} text="Última modificação em" />
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
            <Button aria-haspopup="true" size="icon" variant="ghost">
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
