import { ProductStatus } from "../../types/products-types";

export function getProductTextByStatus(status: ProductStatus) {
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

export function getProductDescriptionByStatus(status: ProductStatus) {
  switch (status) {
    case "enabled":
      return "Produto ativo e disponível para venda";
    case "draft":
      return "Produto em rascunho e não disponível para venda";
    case "archived":
      return "Produto arquivado e não disponível para venda";
    default:
      return "Produto com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: ProductStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
