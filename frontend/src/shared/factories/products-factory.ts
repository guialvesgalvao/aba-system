import { ProductResponse, ProductStatus } from "../types/products-types";
export class Product {
  private _image?: string;
  private _id: number;
  private _name: string;
  private _description?: string;
  private _status: ProductStatus;
  private _createdDate: Date;
  private _createdBy: string;
  private _modifiedDate: Date;
  private _modifiedBy: string;

  constructor(data: ProductResponse) {
    this._image = data.image;
    this._id = data.id;
    this._name = data.name;
    this._description = data.description;
    this._status = data.status;

    // If the data is not provided, the date will be undefined
    this._createdDate = new Date(data.created_at);
    this._createdBy = data.created_by;
    this._modifiedDate = new Date(data.modified_at);
    this._modifiedBy = data.modified_by;
  }

  public get image(): string | undefined {
    return this._image;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get status(): ProductStatus {
    return this._status;
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
