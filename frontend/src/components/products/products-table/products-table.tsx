import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from "../../ui/table";

import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Product } from "@/shared/factories/products-factory";
import { Dialog } from "../../ui/dialog";
import { ProductRow } from "./products-row";

export interface IProductsTableProps {
  products: Product[];
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
        {products.map((product, index) => (
          <ProductRow product={product} key={index} />
        ))}
      </TableBody>
    </Table>
  );
}
