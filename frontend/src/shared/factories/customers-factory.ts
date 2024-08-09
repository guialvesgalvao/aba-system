import { CustomerResponse, CustomerStatus } from "../types/customers-types";

export class Customer {
  private _id: number;
  private _fantasy_name: string;
  private _cnpj: string;
  private _state_registration: string;
  private _complete_address: string;
  private _delivery_address: string;
  private _status: CustomerStatus;
  private _createdDate: Date;
  private _createdBy: string;
  private _modifiedDate: Date;
  private _modifiedBy: string;

  constructor(data: CustomerResponse) {
    this._id = data.id;
    this._fantasy_name = data.fantasy_name;
    this._cnpj = data.cnpj;
    this._state_registration = data.state_registration;
    this._complete_address = data.complete_address;
    this._delivery_address = data.delivery_address;
    this._status = data.status;

    // If the data is not provided, the date will be undefined
    this._createdDate = new Date(data.created_at);
    this._createdBy = data.created_by;
    this._modifiedDate = new Date(data.modified_at);
    this._modifiedBy = data.modified_by;
  }


  public get id(): number {
    return this._id;
  }

  public get fantasy_name(): string {
    return this._fantasy_name;
  }

  public get status(): CustomerStatus {
    return this._status;
  }

  public get cnpj(): string {
    return this._cnpj;
  }

  public get state_registration(): string {
    return this._state_registration;
  }

  public get complete_address(): string {
    return this._complete_address;
  }

  public get delivery_address(): string {
    return this._delivery_address;
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
