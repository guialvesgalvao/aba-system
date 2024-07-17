import { describe, it, expect } from "vitest";
import { getDeliveryPersonTextByStatus } from "./delivery-persons-helper";

import { DeliveryPersonStatusEnum } from "@/shared/types/delivery-persons-types";

describe("origins-helper-getStatusToText", () => {
  it('should return "Ativo" for "enabled"', () => {
    expect(getDeliveryPersonTextByStatus(DeliveryPersonStatusEnum.enabled)).toBe("Ativo");
  });

  it('should return "Rascunho" for "draft"', () => {
    expect(getDeliveryPersonTextByStatus(DeliveryPersonStatusEnum.draft)).toBe("Rascunho");
  });

  it('should return "Arquivado" for "archived"', () => {
    expect(getDeliveryPersonTextByStatus(DeliveryPersonStatusEnum.archived)).toBe(
      "Arquivado"
    );
  });

  it('should return "-" for unknown status', () => {
    expect(getDeliveryPersonTextByStatus("unknown" as DeliveryPersonStatusEnum)).toBe("-");
  });
});
