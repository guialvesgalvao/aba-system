import { CustomerResponse } from "../types/customers-types";
import { OrderResponse, OrderStatus } from "../types/orders-types";
import { Customer } from "./customers-factory";

export class Order {
  private _id: number;
  private _client_id: number;
  private _client_data: Customer | undefined;
  private _origin_id: number;
  private _status: OrderStatus;
  private _order_itens: Array<OrderItens> | undefined;
  private _total_cost_value: number;
  private _total_sale_value: number;
  private _extra_details: string;
  private _order_date: Date;
  private _invoicing_date: Date;
  private _createdDate: Date;
  private _createdBy: string;
  private _modifiedDate: Date;
  private _modifiedBy: string;

  constructor(data: OrderResponse) {
    this._id = data.id;
    this._client_id = data.client_id;
    this._client_data = data.client_data ?? undefined;
    this._origin_id = data.origin_id;
    this._status = data.status;
    this._total_cost_value = data.total_cost_value;
    this._total_sale_value = data.total_sale_value;
    this._extra_details = data.extra_details;
    this._order_date = new Date(data.order_date);
    this._invoicing_date = new Date(data.invoicing_date);
    this._order_itens = data.order_itens ?? undefined;

    // If the data is not provided, the date will be undefined
    this._createdDate = new Date(data.created_at);
    this._createdBy = data.created_by;
    this._modifiedDate = new Date(data.modified_at);
    this._modifiedBy = data.modified_by;
  }


  public get id(): number {
    return this._id;
  }

  public get client_id(): number {
    return this._client_id;
  }

  public get origin_id(): number {
    return this._origin_id;
  }

  public get status(): OrderStatus {
    return this._status;
  }

  public get order_itens(): OrderItensExtendedResponse[] {
    if (this._order_itens && this._order_itens.length > 0) {
      return this._order_itens;
    }

    return [];
  }

  public get client_data(): Customer | undefined{
      return this._client_data ?? undefined;
  }

  public get total_cost_value(): number {
    return this._total_cost_value;
  }

  public get total_sale_value(): number {
    return this._total_sale_value;
  }

  public get extra_details(): string {
    return this._extra_details;
  }

  public get order_date(): Date {
    return this._order_date;
  }

  public get invoicing_date(): Date {
    return this._invoicing_date;
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
