import { describe, it, expect } from "vitest";
import { getProductTextByStatus } from "./products-helper";

import { ProductStatusEnum } from "@/shared/models/products-model";

describe("products-helper-getStatusToText", () => {
  it('should return "Ativo" for "enabled"', () => {
    expect(getProductTextByStatus(ProductStatusEnum.enabled)).toBe("Ativo");
  });

  it('should return "Rascunho" for "draft"', () => {
    expect(getProductTextByStatus(ProductStatusEnum.draft)).toBe("Rascunho");
  });

  it('should return "Arquivado" for "archived"', () => {
    expect(getProductTextByStatus(ProductStatusEnum.archived)).toBe(
      "Arquivado"
    );
  });

  it('should return "-" for unknown status', () => {
    expect(getProductTextByStatus("unknown" as ProductStatusEnum)).toBe("-");
  });
});
