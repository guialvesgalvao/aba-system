import { OrderItensStatus } from "../../types/orders-itens-types";

export function getOrderTextByStatus(status: OrderItensStatus) {
  switch (status) {
    case "draft":
      return "Em Rascunho";
    case "awaitingSupplierConfirmation":
      return "Aguardando confirmação do fornecedor";
    case "confirmedAwaitingProduction":
      return "Em produção";
    case "productionCompleteAwaitingCarrier":
      return "Aguardando escolha de transportadora";
    case "pendingDeliveryToCarrier":
      return "Pendente de entrega a transportadora";
    case "pendingDeliveryToCustomer":
      return "Pendente de entrega ao cliente";
    case "deliveredAwaitingBilling":
      return "Entregue e aguardando faturamento";
    case "completed":
      return "Pedido finalizado";
    case "canceled":
      return "Pedido cancelado";
    default:
      return "-";
  }
}

export function getOrderDescriptionByStatus(status: OrderItensStatus) {
  switch (status) {
    case "draft":
      return "Produto em rascunho";
    case "awaitingSupplierConfirmation":
      return "Aguardando confirmação do fornecedor";
    case "confirmedAwaitingProduction":
      return "Produto  Confirmado pelo fornecedor e aguardando produção";
    case "productionCompleteAwaitingCarrier":
      return "Produto pronto e aguardando escolha de transportadora";
    case "pendingDeliveryToCarrier":
      return "Produto pendente de entrega a transportadora";
    case "pendingDeliveryToCustomer":
      return "Produto pendente de entrega ao cliente";
    case "deliveredAwaitingBilling":
      return "Produto entregue e aguardando faturamento";
    case "completed":
      return "Produto entregue";
    case "canceled":
      return "Produto cancelado";
    default:
      return "Produto com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: OrderItensStatus) {
  const colors = {
    draft: "bg-gray-700",
    awaitingSupplierConfirmation: "bg-gray-700",
    in_progress: "bg-gray-700",
    confirmedAwaitingProduction: "bg-gray-700",
    productionCompleteAwaitingCarrier: "bg-gray-700",
    pendingDeliveryToCarrier: "bg-gray-700",
    pendingDeliveryToCustomer: "bg-gray-700",
    deliveredAwaitingBilling: "bg-gray-700",
    completed: "bg-green-700",
    canceled: "bg-red-700",
  };

  return colors[status] || "bg-gray-500";
}
