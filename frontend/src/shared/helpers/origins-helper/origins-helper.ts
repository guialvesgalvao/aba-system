import { OriginStatus } from "../../types/origins-types";

export function getOriginTextByStatus(status: OriginStatus) {
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

export function getOriginDescriptionByStatus(status: OriginStatus) {
  switch (status) {
    case "enabled":
      return "Origem ativo e disponível para venda";
    case "draft":
      return "Origem em rascunho e não disponível para venda";
    case "archived":
      return "Origem arquivado e não disponível para venda";
    default:
      return "Origem com status desconhecido";
  }
}

export function getBadgeColorBasedOnStatus(status: OriginStatus) {
  const colors = {
    enabled: "bg-green-700",
    draft: "bg-gray-700",
    archived: "bg-orange-700",
  };

  return colors[status] || "bg-gray-500";
}
