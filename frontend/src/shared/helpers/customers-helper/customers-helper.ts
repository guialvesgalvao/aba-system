import { CustomerStatus } from "../../types/customers-types";

export function getCustomerTextByStatus(status: CustomerStatus) {
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

export function getCustomerDescriptionByStatus(status: CustomerStatus) {
  switch (status) {
    case "enabled":
      return "Cliente ativo e disponível";
    case "draft":
      return "Cliente em rascunho e não disponível";
    case "archived":
      return "Cliente arquivado e não disponível";
    default:
      return "Cliente com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: CustomerStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
