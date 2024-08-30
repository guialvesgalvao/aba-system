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
import { DeliveryPerson } from "@/shared/factories/delivery-persons-factory";
import {
  getFormattedDynamicText,
  getFullFormattedDate,
} from "@/shared/helpers/date-helper/date-helper";
import {
  getDeliveryPersonTextByStatus,
  getBadgeColorBasedOnStatus,
  getDeliveryPersonDescriptionByStatus,
} from "@/shared/helpers/delivery-persons-helper/delivery-persons-helper";
import { getShortedText } from "@/shared/helpers/table-helper/table-helper";
import { DeliveryPersonStatus } from "@/shared/types/delivery-persons-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DeliveryPersonsForm } from "../delivery-persons-form/delivery-persons-form";
import { DeleteDialog } from "@/components/utilities/delete-dialog";
import DeliveryPersonsService from "@/shared/services/delivery-persons-service";

export const columns: ColumnDef<DeliveryPerson>[] = [
  {
    header: ({ column }) => (
      <SortingColumn<DeliveryPerson> column={column} text="ID" />
    ),
    accessorKey: "id",
  },
  {
    header: ({ column }) => (
      <SortingColumn<DeliveryPerson> column={column} text="Nome" />
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
      <SortingColumn<DeliveryPerson> column={column} text="Status" />
    ),
    accessorKey: "status",
    cell({ row }) {
      const status: DeliveryPersonStatus = row.getValue("status");

      return (
        <StatusBadge
          text={getDeliveryPersonTextByStatus(status)}
          className={getBadgeColorBasedOnStatus(status)}
          description={getDeliveryPersonDescriptionByStatus(status)}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    header: ({ column }) => (
      <SortingColumn<DeliveryPerson> column={column} text="Criado em" />
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
      <SortingColumn<DeliveryPerson>
        column={column}
        text="Última modificação em"
      />
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
      const deliveryPerson = row.original;
      const service = new DeliveryPersonsService();
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem >
              <DeliveryPersonsForm 
              trigger={<DialogTrigger>Editar</DialogTrigger>}
              item={deliveryPerson}
              formKeys={["delivery-persons"]}               
              isFetching={false}
              isLoading={false}
              />
              
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.preventDefault()}>
              <DeleteDialog
                trigger={<DialogTrigger>Excluir</DialogTrigger>}
                confirmMessage={"Tem certeza que deseja excluir este tipo de entrega?"}
                onSubmit={() => service.deleteDeliveryPerson(deliveryPerson.id)}
                queryKey={["delivery-persons"]}
              ></DeleteDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
