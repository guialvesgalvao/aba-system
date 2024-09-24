import { SupplierProduct } from "../factories/suppliers-products-factory";
import { SupplierProductRequest } from "../types/suppliers-products-types";

export abstract class SuppliersProductsModel {
  abstract getAllSuppliersProducts(): Promise<SupplierProduct[]>;
  abstract getSupplierProductById(id: number): Promise<SupplierProduct>;
  abstract createSupplierProduct(supplier: SupplierProductRequest): Promise<SupplierProduct>;
  abstract updateSupplierProduct(supplier: SupplierProductRequest): Promise<SupplierProduct>;
  abstract deleteSupplierProduct(id: number): Promise<void>;
}
