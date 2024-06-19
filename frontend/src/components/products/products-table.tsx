import { ProductModel } from "@/shared/models/products-model";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import {
  getBadgeColorBasedOnStatus,
  getProductDescriptionByStatus,
  getProductTextByStatus,
} from "@/shared/helpers/products-helper/products-helper";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { StatusBadge } from "../status-badge/status-badge";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

export interface IProductsTableProps {
  products: ProductModel[];
  isLoading?: boolean;
  isFetching?: boolean;
}

export function ProductsTable(props: IProductsTableProps) {
  const { products, isLoading, isFetching } = props;

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos produtos" className="w-12 h-12" />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Imagem</span>
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>

          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Criado em</TableHead>
          <TableHead className="hidden md:table-cell">
            Última modificação em
          </TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product, index) => {
          const description = product?.description
            ? product?.description?.length > 30
              ? product?.description?.slice(0, 30) + "..."
              : product?.description
            : "-";

          return (
            <TableRow key={index}>
              <TableCell>
                <Avatar className="w-16 h-16 aspect-square rounded-md object-cover">
                  <AvatarImage src={product?.image ?? ""} />
                  <AvatarFallback
                    className="w-16 h-16 aspect-square rounded-md object-cover"
                    delayMs={600}
                  >
                    {product.title}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>
                <Tooltip delayDuration={400}>
                  <TooltipTrigger>{description}</TooltipTrigger>
                  <TooltipContent className="max-w-80">
                    {product?.description ?? "-"}
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>
                <StatusBadge
                  text={getProductTextByStatus(product.active)}
                  className={getBadgeColorBasedOnStatus(product.active)}
                  description={getProductDescriptionByStatus(product.active)}
                />
              </TableCell>
              <TableCell>
                {new Date(product.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(product.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
