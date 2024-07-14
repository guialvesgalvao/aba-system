import { describe, it, expect } from "vitest";
import { getOriginTextByStatus } from "./origins-helper";

import { OriginStatusEnum } from "@/shared/types/origins-types";

describe("origins-helper-getStatusToText", () => {
  it('should return "Ativo" for "enabled"', () => {
    expect(getOriginTextByStatus(OriginStatusEnum.enabled)).toBe("Ativo");
  });

  it('should return "Rascunho" for "draft"', () => {
    expect(getOriginTextByStatus(OriginStatusEnum.draft)).toBe("Rascunho");
  });

  it('should return "Arquivado" for "archived"', () => {
    expect(getOriginTextByStatus(OriginStatusEnum.archived)).toBe(
      "Arquivado"
    );
  });

  it('should return "-" for unknown status', () => {
    expect(getOriginTextByStatus("unknown" as OriginStatusEnum)).toBe("-");
  });
});
