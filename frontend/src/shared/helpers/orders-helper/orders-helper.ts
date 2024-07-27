import { OrderStatus } from "../../types/orders-types";

export function getOrderTextByStatus(status: OrderStatus) {
  switch (status) {
    case "enabled":
      return "Ativo";
    case "draft":
      return "Rascunho";
    case "archived":
      return "Arquivado";
    default:
      return "-";
  }
}

export function getOrderDescriptionByStatus(status: OrderStatus) {
  switch (status) {
    case "enabled":
      return "Pedido ativo e disponível para venda";
    case "draft":
      return "Pedido em rascunho e não disponível para venda";
    case "archived":
      return "Pedido arquivado e não disponível para venda";
    default:
      return "Pedido com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: OrderStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
