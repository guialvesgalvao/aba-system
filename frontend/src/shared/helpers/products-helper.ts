import { ProductStatus } from "../models/products-model";

export function getStatusToText(status: ProductStatus) {
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
