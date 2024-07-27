import { ComponentResponse } from "@/components/component-request/component-request";
import { StaticTable } from "@/components/static-table/static-table";
import { columns } from "./orders-static-columns";

import { ErrorMessage } from "@/components/error-message/error-message";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { AlertCircle } from "lucide-react";
import { Product } from "@/shared/factories/products-factory";

export interface IOrdersStaticTableProps extends ComponentResponse<any> {}

export function OrdersStaticTable(props: Readonly<IOrdersStaticTableProps>) {
  const { data: orders, isLoading, isError, error, isFetching } = props;

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
    <StaticTable<Product>
      caption="Pedidos Recentes"
      headers={columns}
      data={orders}
    />
  );
}
