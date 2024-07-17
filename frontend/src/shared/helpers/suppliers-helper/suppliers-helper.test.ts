import { describe, it, expect } from "vitest";
import { getSupplierTextByStatus } from "./suppliers-helper";

import { SupplierStatusEnum } from "@/shared/types/suppliers-types";

describe("suppliers-helper-getStatusToText", () => {
  it('should return "Ativo" for "enabled"', () => {
    expect(getSupplierTextByStatus(SupplierStatusEnum.enabled)).toBe("Ativo");
  });

  it('should return "Rascunho" for "draft"', () => {
    expect(getSupplierTextByStatus(SupplierStatusEnum.draft)).toBe("Rascunho");
  });

  it('should return "Arquivado" for "archived"', () => {
    expect(getSupplierTextByStatus(SupplierStatusEnum.archived)).toBe(
      "Arquivado"
    );
  });

  it('should return "-" for unknown status', () => {
    expect(getSupplierTextByStatus("unknown" as SupplierStatusEnum)).toBe("-");
  });
});
