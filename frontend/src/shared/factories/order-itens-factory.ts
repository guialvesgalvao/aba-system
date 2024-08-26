import { OrderItensResponse, OrderItensStatus } from "../types/orders-itens-types";
import { ProductResponse } from "../types/products-types";

export class OrderItens {
  private _id: number;
  private _cost_value: number;
  private _quantity: number;
  private _status: OrderItensStatus;
  private _sale_value: number;
  private _delivery_date: Date;
  private _created_at: Date;
  private _modified_at: Date;
  private _created_by: string;
  private _modified_by: string;
  private _order_id: number;
  private _product_id: number;
  private _product_data: ProductResponse | undefined;
  private _invoicing_id: number;
  private _delivery_person_id: number;
  private _invoiced: boolean;

  constructor(
    data: OrderItensResponse,
    product_data?: ProductResponse | undefined
  ) {
    this._id = data.id;
    this._cost_value = data.cost_value;
    this._quantity = data.quantity;
    this._status = data.status;
    this._sale_value = data.sale_value;
    
    this._order_id = data.order_id;
    this._product_id = data.product_id;
    this._product_data = product_data ?? undefined;
    this._invoicing_id = data.invoicing_id;
    this._delivery_person_id = data.delivery_person_id;
    this._invoiced = data.invoiced;
    
    // If the data is not provided, the date will be undefined
    this._delivery_date = new Date(data.delivery_date);
    this._created_at = new Date(data.created_at);
    this._created_by = data.created_by;
    this._modified_at = new Date(data.modified_at);
    this._modified_by = data.modified_by;
  }

  public get id(): number {
    return this._id;
  }

  public get cost_value(): number {
    return this._cost_value;
  }

  public get quantity(): number {
    return this._quantity;
  } 

  public get status(): OrderItensStatus {
    return this._status;
  }

  public get product_data(): ProductResponse | undefined {
    return this._product_data ?? undefined;
  }

  public get product_id(): number {
    return this._product_id;
  }

  public get sale_value(): number {
    return this._sale_value;
  }

  public get delivery_date(): Date {
    return this._delivery_date;
  }

  public get order_id(): number {
    return this._order_id;
  }

  public get invoicing_id(): number {
    return this._invoicing_id;
  }

  public get delivery_person_id(): number {
    return this._delivery_person_id;
  }

  public get invoiced(): boolean {
    return this._invoiced;
  }

  public get created_at(): Date {
    return this._created_at;
  }

  public get created_by(): string {
    return this._created_by;
  }

  public get modified_at(): Date {
    return this._modified_at;
  }

  public get modified_by(): string {
    return this._modified_by;
  }
}
