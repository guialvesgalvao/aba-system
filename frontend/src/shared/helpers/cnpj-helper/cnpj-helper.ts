export class CNPJ {
  static readonly LENGTH = 12;
  static readonly FORMAT = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
  static readonly WEIGHTS_FIRST_DIGIT = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  static readonly WEIGHTS_SECOND_DIGIT = [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ];

  value: string;

  constructor(value?: string) {
    if (!value) {
      this.value = this._generateCNPJ();
    } else if (this.isValidCNPJ(value)) {
      this.value = value.replace(/[^\d]/g, ""); // Ensure value is unformatted
    } else {
      throw new Error("Invalid CNPJ provided.");
    }
  }

  formatCNPJ(): string {
    return this.value.replace(CNPJ.FORMAT, "$1.$2.$3/$4-$5");
  }

  isValidCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, "");

    if (cleanCNPJ.length !== 14) {
      return false;
    }

    const baseCNPJ = cleanCNPJ.slice(0, 12);
    const checkDigits = cleanCNPJ.slice(12);

    const firstCheckDigit = this._calculateCheckDigit(
      baseCNPJ,
      CNPJ.WEIGHTS_FIRST_DIGIT
    );
    const secondCheckDigit = this._calculateCheckDigit(
      baseCNPJ + firstCheckDigit,
      CNPJ.WEIGHTS_SECOND_DIGIT
    );

    return checkDigits === `${firstCheckDigit}${secondCheckDigit}`;
  }

  private _generateCNPJ(): string {
    const cnpjWithoutCheckDigits = this._generateRandomNumbers();

    const firstCheckDigit = this._calculateCheckDigit(
      cnpjWithoutCheckDigits,
      CNPJ.WEIGHTS_FIRST_DIGIT
    );
    const secondCheckDigit = this._calculateCheckDigit(
      cnpjWithoutCheckDigits + firstCheckDigit,
      CNPJ.WEIGHTS_SECOND_DIGIT
    );

    return cnpjWithoutCheckDigits + firstCheckDigit + secondCheckDigit;
  }

  private _generateRandomNumbers(): string {
    return Array.from({ length: CNPJ.LENGTH }, () =>
      Math.floor(Math.random() * 9)
    ).join("");
  }

  private _calculateCheckDigit(cnpj: string, weights: number[]): number {
    const sum = cnpj
      .split("")
      .map(Number)
      .reduce((acc, digit, index) => acc + digit * weights[index], 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
}
