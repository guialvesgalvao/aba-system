import { Supplier } from "../factories/suppliers-factory";
import { SupplierRequest } from "../types/suppliers-types";

export abstract class SuppliersModel {
  abstract getSuppliers(): Promise<Supplier[]>;
  abstract getSupplierById(id: number): Promise<Supplier>;
  abstract createSupplier(supplier: SupplierRequest): Promise<Supplier>;
  abstract updateSupplier(supplier: SupplierRequest): Promise<Supplier>;
  abstract deleteSupplier(id: number): Promise<void>;
}
