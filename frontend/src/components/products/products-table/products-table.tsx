import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Product } from "@/shared/factories/products-factory";
import { columns } from "./products-columns";
import { RenderTable } from "@/components/render-table/RenderTable";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormRequest } from "@/components/form-request/form-request";
import { ProductsForm } from "../products-form/products-form";
import ProductsService from "@/shared/services/products-service";

export interface IProductsTableProps {
  data: Product[];
  isLoading?: boolean;
  isFetching?: boolean;
}

export function ProductsTable(props: IProductsTableProps) {
  const { data: products, isLoading, isFetching } = props;
  const { getProductById } = new ProductsService();

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos produtos" className="w-12 h-12" />
      </div>
    );

  return (
    <Dialog>
      <RenderTable<Product> data={products} columns={columns} />

      <DialogContent className="max-w-[900px]">
        <FormRequest
          id={0}
          component={ProductsForm}
          form="products"
          request={getProductById}
          loading="Carregando produto"
        />
      </DialogContent>
    </Dialog>
  );
}
