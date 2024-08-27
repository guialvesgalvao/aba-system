import { LoadingSpinner } from "../../loading-spinner/loading-spinner";

import { Order } from "@/shared/factories/orders-factory";
import { columns } from "./orders-columns";
import RenderTable from "@/components/render-table/render-table";
import { ComponentResponse } from "@/components/component-request/component-request";
import { ErrorMessage } from "@/components/error-message/error-message";
import { AlertCircle } from "lucide-react";
import { STATUS_ORDERS_OPTIONS } from "@/shared/constants";
import { OrderItens } from "./subc-order-itens";

export interface IOrdersTableProps extends ComponentResponse<Order> {}

export function OrdersTable(props: IOrdersTableProps) {
  const {
    data: orders,
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
        <LoadingSpinner
          text="Buscando todos os pedidos"
          className="w-12 h-12"
        />
      </div>
    );

  return (
    <RenderTable<Order>
      id="orders-table"
      refetch={refetch}
      data={orders}
      columns={columns}
      emptyMessage="Nenhum produto encontrado"
      searchOptions={{
        placeholder: "Filtrar pedidos pelo nome...",
        columnId: "name",
      }}
      columnFilter={{
        columns: [
          {
            id: "status",
            title: "Status",
            options: STATUS_ORDERS_OPTIONS,
          },
        ],
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
      
      renderSubComponent={({ row }) => (
        <div className="bg-white hover:bg-white">
          <OrderItens order_id={row.original.id} />
        </div>
      )}
    />
  );
}
