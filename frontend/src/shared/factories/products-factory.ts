import { ProductsFormValidationType } from "@/components/products/products-form/products-form";
import { ProductModel, ProductStatus } from "../models/products-model";
import { deleteProduct, updateProduct } from "../services/products-service";

export class Product {
  private _image?: string;
  private _id: number;
  private _title: string;
  private _description?: string;
  private _status: ProductStatus;
  private _createdDate: Date;
  private _updatedDate: Date;

  constructor(data: ProductModel) {
    this._image = data.image;
    this._id = data.id;
    this._title = data.title;
    this._description = data.description;
    this._status = data.active;
    this._createdDate = new Date(data.created_at);
    this._updatedDate = new Date(data.updated_at);

    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public get image(): string | undefined {
    return this._image;
  }

  public get id(): number {
    return this._id;
  }

  public get title(): string {
    return this._title;
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

  public get updatedDate(): Date {
    return this._updatedDate;
  }

  public async update(data: ProductsFormValidationType): Promise<void> {
    const model = this.mapFormDataToModel(data);
    await updateProduct(model);

    this._title = model.title;
    this._description = model.description;
    this._status = model.active;
  }

  public async delete(): Promise<void> {
    await deleteProduct(this._id);
  }

  private mapFormDataToModel(
    data: ProductsFormValidationType
  ): Omit<ProductModel, "created_at" | "updated_at"> {
    return {
      image: this._image,
      id: this._id,
      title: data.title,
      description: data.description,
      active: data.status,
    };
  }
}
