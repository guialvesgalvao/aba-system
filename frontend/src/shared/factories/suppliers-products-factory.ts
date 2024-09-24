import { SupplierProductResponse } from "../types/suppliers-products-types";

export class SupplierProduct {
  private _id: number;
  private _value: number;
  private _validity_period: number;
  private _created_at: Date | null;
  private _created_by: string | null;
  private _modified_at: Date | null;
  private _modified_by: string | null;

  constructor( data: SupplierProductResponse) {
    this._id = data.id;
    this._value = data.value;
    this._validity_period = data.validity_period;

    // Se os dados não forem fornecidos, a data será undefined
    this._created_at = new Date(data.created_at);
    this._created_by = data.created_by;
    this._modified_at = new Date(data.modified_at);
    this._modified_by = data.modified_by;
  }

  public get id(): number {
    return this._id;
  }

  public get value(): number {
    return this._value;
  }

  public get validity_period(): number {
    return this._validity_period;
  }


  public get created_at(): Date | null {
    return this._created_at;
  }

  public get created_by(): string | null {
    return this._created_by;
  }

  public get modified_at(): Date | null {
    return this._modified_at;
  }

  public get modified_by(): string | null {
    return this._modified_by;
  }
}
