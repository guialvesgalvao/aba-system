import { SupplierStatus, SupplierResponse } from "../types/suppliers-types";
import { SupplierProductExtendedResponse } from "../types/suppliers-products-types";

export class Supplier {
  private _id: number;
  private _name: string;
  private _automatic_invoicing: boolean;
  private _supplier_products: SupplierProductExtendedResponse[] | undefined;
  private _cnpj: string;
  private _status: SupplierStatus;
  private _createdDate: Date | null;
  private _createdBy: string | null;
  private _modifiedDate: Date | null;
  private _modifiedBy: string | null;

  constructor(data: SupplierResponse | Supplier, supplier_product?: Array<SupplierProductExtendedResponse> | undefined) {
    this._id = data.id;
    this._name = data.name;
    this._status = data.status;
    this._cnpj = data.cnpj;
    this._automatic_invoicing = data.automatic_invoicing;
    this._supplier_products = supplier_product ? supplier_product : undefined;

    // Se os dados não forem fornecidos, a data será undefined
    // Verifique a existência dos campos antes de atribuí-los
    this._createdDate = 'created_at' in data ? new Date(data.created_at as string) : null;
    this._createdBy = 'created_by' in data ? data.created_by as string : null;
    this._modifiedDate = 'modified_at' in data ? new Date(data.modified_at as string) : null;
    this._modifiedBy = 'modified_by' in data ? data.modified_by as string : null;
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
  

  public get supplier_products(): SupplierProductExtendedResponse[] {
    if(this._supplier_products && this._supplier_products.length > 0) {
      return this._supplier_products;
    }
    return [];
  }

  public get automatic_invoicing(): boolean {
    return this._automatic_invoicing;
  }

  public get createdDate(): Date | null {
    return this._createdDate;
  }

  public get createdBy(): string | null {
    return this._createdBy;
  }

  public get modifiedDate(): Date | null {
    return this._modifiedDate;
  }

  public get modifiedBy(): string | null {
    return this._modifiedBy;
  }
}
