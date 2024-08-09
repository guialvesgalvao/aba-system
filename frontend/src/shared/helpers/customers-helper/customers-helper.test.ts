import { describe, it, expect } from "vitest";
import { getCustomerTextByStatus } from "./customers-helper";

import { CustomerStatusEnum } from "@/shared/types/customers-types";

describe("origins-helper-getStatusToText", () => {
  it('should return "Ativo" for "enabled"', () => {
    expect(getCustomerTextByStatus(CustomerStatusEnum.enabled)).toBe("Ativo");
  });

  it('should return "Rascunho" for "draft"', () => {
    expect(getCustomerTextByStatus(CustomerStatusEnum.draft)).toBe("Rascunho");
  });

  it('should return "Arquivado" for "archived"', () => {
    expect(getCustomerTextByStatus(CustomerStatusEnum.archived)).toBe(
      "Arquivado"
    );
  });

  it('should return "-" for unknown status', () => {
    expect(getCustomerTextByStatus("unknown" as CustomerStatusEnum)).toBe("-");
  });
});
