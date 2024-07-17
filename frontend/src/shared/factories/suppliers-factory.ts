import { SupplierResponse, SupplierStatus } from "../types/suppliers-types";

export class Supplier {
  private _id: number;
  private _name: string;
  private _automatic_invoicing: boolean;
  private _cnpj: string;
  private _status: SupplierStatus;
  private _createdDate: Date;
  private _createdBy: string;
  private _modifiedDate: Date;
  private _modifiedBy: string;

  constructor(data: SupplierResponse) {
    this._id = data.id;
    this._name = data.name;
    this._status = data.status;
    this._cnpj = data.cnpj;
    this._automatic_invoicing = data.automatic_invoicing;

    // If the data is not provided, the date will be undefined
    this._createdDate = new Date(data.created_at);
    this._createdBy = data.created_by;
    this._modifiedDate = new Date(data.modified_at);
    this._modifiedBy = data.modified_by;
  }


  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get status(): SupplierStatus {
    return this._status;
  }

  public get cnpj(): string {
    return this._cnpj;
  }

  public get automatic_invoicing(): boolean {
    return this._automatic_invoicing;
  }

  public get createdDate(): Date {
    return this._createdDate;
  }

  public get createdBy(): string {
    return this._createdBy;
  }

  public get modifiedDate(): Date {
    return this._modifiedDate;
  }

  public get modifiedBy(): string {
    return this._modifiedBy;
  }
}
