import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Product } from "@/shared/factories/products-factory";
import { columns } from "./products-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import { STATUS_OPTIONS } from "@/shared/constants";

export interface IProductsTableProps extends ComponentResponse<Product> {}

export function ProductsTable(props: IProductsTableProps) {
  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = props;

  if (isError) {
    return (
      <ErrorMessage
        className="text-lg"
        icon={<AlertCircle className="w-14 h-14" />}
        error={error}
      />
    );
  }

  if (isLoading || isFetching)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Buscando todos produtos" className="w-12 h-12" />
      </div>
    );

  return (
    <RenderTable<Product>
      id="products-table"
      refetch={refetch}
      data={products}
      columns={columns}
      columnFilter={{
        columns: [
          {
            id: "status",
            title: "Status",
            options: STATUS_OPTIONS,
          },
        ],
      }}
      emptyMessage="Nenhum produto encontrado"
      searchOptions={{
        placeholder: "Filtrar produtos pelo nome...",
        columnId: "name",
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
      defaultSizes={[5, 10, 20]}
    />
  );
}
