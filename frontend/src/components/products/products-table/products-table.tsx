import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Product } from "@/shared/factories/products-factory";
import { columns } from "./products-columns";
import { RenderTable } from "@/components/render-table/render-table";

export interface IProductsTableProps {
  data: Product[];
  isLoading?: boolean;
  isFetching?: boolean;
}

export function ProductsTable(props: IProductsTableProps) {
  const { data: products, isLoading, isFetching } = props;

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos produtos" className="w-12 h-12" />
      </div>
    );

  return (
    <RenderTable<Product>
      data={products}
      columns={columns}
      emptyMessage="Nenhum produto encontrado"
      searchOptions={{
        placeholder: "Filtrar produtos pelo nome...",
        columnId: "name",
      }}
      columnChooser={{
        text: "Colunas",
      }}
      defaultSorting={[
        {
          id: "modifiedDate",
          desc: true,
        },
      ]}
      defaultPagination={{
        pageSize: 10,
        pageIndex: 0,
      }}
    />
  );
}
