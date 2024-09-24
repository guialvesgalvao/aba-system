import { StaticColumn } from "@/components/static-table/static-table";
import { SupplierProductExtendedResponse, SupplierProductResponse } from "@/shared/types/suppliers-products-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addDays, format, parseISO } from "date-fns";
import { DeleteDialog } from "@/components/utilities/delete-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { SupplierProduct } from "@/shared/factories/suppliers-products-factory";
import SuppliersProductsService  from "@/shared/services/suppliers-products-service";

export const columns: StaticColumn<SupplierProductExtendedResponse>[] = [
  {
    id: "id",
    header: "ID",
    cell(row) {
      return row.id;
    },
  },
  {
    id: "product_info",
    header: "Nome do produto",
    cell(row) {
      return `${row.product_info.name}`;
    },
  },
  {
    id: "value",
    header: "Valor",
    cell(row) {
      return <p>R$ {row.value}</p>;
    },
  },
  {
    id: "validity_period",
    header: "Valor válido até",
    cell(row) {
      const date = parseISO(row.created_at);
      const newDate = addDays(date, row.validity_period);

      return format(newDate, "dd/MM/yyyy");
    },
  },
  // {
  //   header:  <span className="sr-only">Ações</span>,
  //   accessorKey: "actions",
  //   enableHiding: false,
  //   enableResizing: false,
  //   enableSorting: false,
  //   enableColumnFilter: false,
  //   cell({ row }) {
  //     const supplier:SupplierProduct = row.original;
  //     const service = new SuppliersProductsService();

  //     return (
  //       <DropdownMenu modal={false}>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             type="button"
  //             aria-haspopup="true"
  //             size="icon"
  //             variant="ghost"
  //           >
  //             <MoreHorizontal className="h-4 w-4" />
  //             <span className="sr-only">Toggle menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Ações</DropdownMenuLabel>

  //           <DropdownMenuItem onClick={(e) => e.preventDefault()}>
  //             <SuppliersProductsForm
  //             trigger={<DialogTrigger>Editar</DialogTrigger>} 
  //             item={supplier}
  //             formKeys={['suppliers']}
  //             isFetching={false}
  //             isLoading={false}
  //             />
  //           </DropdownMenuItem>

  //           <DropdownMenuItem onClick={(e) => e.preventDefault()}>
  //             <DeleteDialog
  //               trigger={<DialogTrigger>Excluir</DialogTrigger>}
  //               confirmMessage={"Tem certeza que deseja excluir este fornecedor e seus produtos?"}
  //               onSubmit={() => service.deleteSupplierExtendendData(supplier.id)}
  //               queryKey={['suppliers']}
  //             />
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
