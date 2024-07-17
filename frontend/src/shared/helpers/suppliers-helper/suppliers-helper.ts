import { SupplierStatus } from "../../types/suppliers-types";

export function getSupplierTextByStatus(status: SupplierStatus) {
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

export function getSupplierDescriptionByStatus(status: SupplierStatus) {
  switch (status) {
    case "enabled":
      return "Fornecedor ativo e disponível para venda";
    case "draft":
      return "Fornecedor em rascunho e não disponível para venda";
    case "archived":
      return "Fornecedor arquivado e não disponível para venda";
    default:
      return "Fornecedor com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: SupplierStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
