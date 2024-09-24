import { SupplierProduct } from "../factories/suppliers-products-factory";
import { SuppliersProductsModel } from "../models/suppliers-products-model";
import { SuppliersProductsRepo } from "../repositories/suppliers-products-repo";
import { SupplierProductRequest } from "../types/suppliers-products-types";

export default class SuppliersProductsService implements SuppliersProductsModel {
  private _repository: SuppliersProductsRepo;

  constructor() {
    this._repository = new SuppliersProductsRepo();

    this.getAllSuppliersProducts = this.getAllSuppliersProducts.bind(this);
    this.getSupplierProductById = this.getSupplierProductById.bind(this);
    this.createSupplierProduct = this.createSupplierProduct.bind(this);
    this.updateSupplierProduct = this.updateSupplierProduct.bind(this);
    this.deleteSupplierProduct = this.deleteSupplierProduct.bind(this);
  }

  async getAllSuppliersProducts(): Promise<SupplierProduct[]> {
    const suppliersProductsFromRepo = await this._repository.getAllSuppliersProducts();

    const suppliersProducts = suppliersProductsFromRepo.map(
      (supplierProduct) => new SupplierProduct(supplierProduct)
    );

    return suppliersProducts;
  }

  async getSupplierProductById(id: number): Promise<SupplierProduct> {
    const supplierProductFromRepo = await this._repository.getById(id);
    const supplierProduct = new SupplierProduct(supplierProductFromRepo);

    return supplierProduct;
  }

  async createSupplierProduct(supplierProduct: SupplierProductRequest): Promise<SupplierProduct> {
    try {
      const newSupplierProduct = await this._repository.addSupplierProduct(supplierProduct);
      return new SupplierProduct(newSupplierProduct);
    } catch (error) {
      throw new Error("Error adding supplier product");
    }
  }

  async updateSupplierProduct(supplierProduct: SupplierProductRequest): Promise<SupplierProduct> {
    if (!supplierProduct.id) throw new Error("SupplierProduct ID is required");

    try {
      const updateSupplierProduct = await this._repository.updateSupplierProducts(supplierProduct);
      return new SupplierProduct(updateSupplierProduct);
    } catch (error) {
      throw new Error("Error updating supplier product");
    }
  }

  async deleteSupplierProduct(id: number): Promise<void> {
    if (!id) throw new Error("SupplierProduct ID is required");

    await this._repository.deleteSupplierProduct(id);
  }

}
