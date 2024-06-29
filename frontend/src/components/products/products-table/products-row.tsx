import { StatusBadge } from "@/components/status-badge/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/shared/factories/products-factory";
import {
  getProductTextByStatus,
  getBadgeColorBasedOnStatus,
  getProductDescriptionByStatus,
} from "@/shared/helpers/products-helper/products-helper";
import { MoreHorizontal } from "lucide-react";
import { ProductsForm } from "../products-form/products-form";

interface IProductRowProps {
  product: Product;
}

export function ProductRow(props: IProductRowProps) {
  const { product } = props;

  function getShortedDescription(description?: string) {
    if (description === undefined) return "-";

    const shortDescription =
      description?.length > 30
        ? description?.slice(0, 30) + "..."
        : description;

    return shortDescription;
  }

  return (
    <Dialog>
      <TableRow>
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
            <TooltipTrigger>
              {getShortedDescription(product?.description)}
            </TooltipTrigger>
            <TooltipContent className="max-w-80">
              {product?.description ?? "-"}
            </TooltipContent>
          </Tooltip>
        </TableCell>
        <TableCell>
          <StatusBadge
            text={getProductTextByStatus(product.status)}
            className={getBadgeColorBasedOnStatus(product.status)}
            description={getProductDescriptionByStatus(product.status)}
          />
        </TableCell>
        <TableCell>{product.createdDate.toLocaleDateString()}</TableCell>
        <TableCell>{product.updatedDate.toLocaleDateString()}</TableCell>
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

              <DropdownMenuItem>
                <DialogTrigger>Editar</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={product.delete}>
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>

        <DialogContent className="max-w-[900px]">
          <ProductsForm product={product} />
        </DialogContent>
      </TableRow>
    </Dialog>
  );
}
