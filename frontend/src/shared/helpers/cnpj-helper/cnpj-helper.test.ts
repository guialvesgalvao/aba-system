import { describe, it, expect } from "vitest";
import { CNPJ } from "./cnpj-helper"; // Ajuste o caminho conforme necessário

describe("CNPJ", () => {
  it("should generate a valid CNPJ", () => {
    const cnpj = new CNPJ();
    const formattedCNPJ = cnpj.formatCNPJ();
    expect(cnpj.isValidCNPJ(cnpj.value)).toBe(true);
    expect(formattedCNPJ).toMatch(CNPJ.FORMAT);
  });

  it("should accept a valid CNPJ and format it correctly", () => {
    const validCNPJ = "12.345.678/9012-34";
    const cnpj = new CNPJ(validCNPJ);
    expect(cnpj.value).toBe(validCNPJ.replace(/[^\d]/g, ""));
    expect(cnpj.formatCNPJ()).toBe(validCNPJ);
  });

  it("should throw an error for an invalid CNPJ", () => {
    const invalidCNPJ = "12.345.678/9012-00";
    expect(() => new CNPJ(invalidCNPJ)).toThrow("Invalid CNPJ provided.");
  });

  it("should correctly identify a valid CNPJ", () => {
    const validCNPJ = "12.345.678/9012-34";
    const cnpj = new CNPJ(validCNPJ);
    expect(cnpj.isValidCNPJ(cnpj.value)).toBe(true);
  });

  it("should correctly identify an invalid CNPJ", () => {
    const invalidCNPJ = "12.345.678/9012-00";
    const cnpj = new CNPJ();
    expect(cnpj.isValidCNPJ(invalidCNPJ.replace(/[^\d]/g, ""))).toBe(false);
  });

  it("should format a CNPJ correctly", () => {
    const rawCNPJ = "12345678901234";
    const cnpj = new CNPJ(rawCNPJ);
    expect(cnpj.formatCNPJ()).toBe("12.345.678/9012-34");
  });

  it("should generate different CNPJs", () => {
    const cnpj1 = new CNPJ();
    const cnpj2 = new CNPJ();
    expect(cnpj1.value).not.toBe(cnpj2.value);
  });
});
