import { DeliveryPersonStatus } from "../../types/delivery-persons-types";

export function getDeliveryPersonTextByStatus(status: DeliveryPersonStatus) {
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

export function getDeliveryPersonDescriptionByStatus(status: DeliveryPersonStatus) {
  switch (status) {
    case "enabled":
      return "Tipo de entrega ativo e disponível para venda";
    case "draft":
      return "Tipo de entrega em rascunho e não disponível para venda";
    case "archived":
      return "Tipo de entrega arquivado e não disponível para venda";
    default:
      return "Tipo de entrega com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: DeliveryPersonStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
