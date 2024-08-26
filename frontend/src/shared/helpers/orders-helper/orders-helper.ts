import { OrderStatus } from "../../types/orders-types";

export function getOrderTextByStatus(status: OrderStatus) {
  switch (status) {
    case "in_progress":
      return "Pedido ativo";
    case "draft":
      return "Pedido em rascunho";
    case "closed":
      return "Pedido finalizado";
    case "canceled":
      return "Pedido cancelado";
    default:
      return "-";
  }
}

export function getOrderDescriptionByStatus(status: OrderStatus) {
  switch (status) {
    case "in_progress":
      return "Pedido ativo";
    case "draft":
      return "Pedido em rascunho";
    case "closed":
      return "Pedido finalizado";
    case "canceled":
      return "Pedido cancelado";
    default:
      return "Pedido com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: OrderStatus) {
  const colors = {
    in_progress: "bg-green-700",
    draft: "bg-gray-700",
    canceled: "bg-red-700",
    closed: "bg-black-700",
  };

  return colors[status] || "bg-gray-500";
}
