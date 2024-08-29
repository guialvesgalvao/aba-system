import OrdersService from "@/shared/services/orders-service";
import { OrderItensStaticTable } from "../orders-itens-static-table/orders-itens-static-table";
import { ComponentRequest } from "@/components/component-request/component-request";

interface IOrderItensProps {
  order_id: number;
}

export function OrderItens(props: Readonly<IOrderItensProps>) {
  const { order_id } = props;

  async function getOrderItens() {
    const service = new OrdersService();
    const orderWithItens = await service.getOrderExtendedData(order_id);
    return orderWithItens.order_itens;
  }

  return (
    <ComponentRequest
      storages={["order-itens"]}
      component={OrderItensStaticTable}
      request={() => getOrderItens()}
    />
  );
}
