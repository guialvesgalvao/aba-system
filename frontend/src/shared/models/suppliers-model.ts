import { Supplier } from "../factories/suppliers-factory";
import { SupplierRequest, SupplierStatus } from "../types/suppliers-types";

export abstract class SuppliersModel {
  abstract getAllSuppliers(): Promise<Supplier[]>;
  abstract getSuppliersByStatus(status: SupplierStatus): Promise<Supplier[]>;
  abstract getSupplierById(id: number): Promise<Supplier>;
  abstract createSupplier(supplier: SupplierRequest): Promise<Supplier>;
  abstract updateSupplier(supplier: SupplierRequest): Promise<Supplier>;
  abstract deleteSupplier(id: number): Promise<void>;
}
