import { ComponentResponse } from "@/components/component-request/component-request";
import { StaticTable } from "@/components/static-table/static-table";
import { columns } from "./orders-itens-static-columns";

import { ErrorMessage } from "@/components/error-message/error-message";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { AlertCircle } from "lucide-react";
import { OrderItensResponse } from "@/shared/types/orders-itens-types";

export interface IOrdersStaticTableProps extends ComponentResponse<OrderItensResponse> {}

export function OrderItensStaticTable(props: Readonly<IOrdersStaticTableProps>) {
  const { data: order_itens, isLoading, isError, error, isFetching } = props;

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
        <LoadingSpinner text="Buscando todos itens de pedido" className="w-12 h-12" />
      </div>
    );

  return (
    <StaticTable<OrderItensResponse>
      caption="Todos os últimos itens de pedidos feitos no sistema"
      headers={columns}
      data={order_itens}
      defaultSorting={{
        id: "modified_at",
        desc: true,
      }}
    />
  );
}
