import { ProductModel } from "@/shared/models/products-model";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { getStatusToText } from "@/shared/helpers/products-helper";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface ProductsTableProps {
  products: ProductModel[];
}

export function ProductsTable(props: ProductsTableProps) {
  const { products } = props;

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
          <TableHead className="hidden md:table-cell">Modificado em</TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell>
              <img
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                width="64"
                height="64"
                src="https://via.placeholder.com/64"
              />
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product?.description ?? "-"}</TableCell>
            <TableCell>
              <Badge variant="secondary">
                {getStatusToText(product.active)}
              </Badge>
            </TableCell>
            <TableCell>{product.created_at}</TableCell>
            <TableCell>{product.updated_at}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
}
