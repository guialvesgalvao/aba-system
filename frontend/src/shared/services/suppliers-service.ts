import { Supplier } from "../factories/suppliers-factory";
import { SuppliersModel } from "../models/suppliers-model";
import { SuppliersRepo } from "../repositories/suppliers-repo";
import { SupplierRequest, SupplierStatus } from "../types/suppliers-types";

export default class SuppliersService implements SuppliersModel {
  private _repository: SuppliersRepo;

  constructor() {
    this._repository = new SuppliersRepo();

    this.getAllSuppliers = this.getAllSuppliers.bind(this);
    this.getSuppliersByStatus = this.getSuppliersByStatus.bind(this);
    this.getSupplierById = this.getSupplierById.bind(this);
    this.createSupplier = this.createSupplier.bind(this);
    this.updateSupplier = this.updateSupplier.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    const suppliersFromRepo = await this._repository.getAllSuppliers();
    const suppliers = suppliersFromRepo.map(
      (supplier) => new Supplier(supplier)
    );

    return suppliers;
  }

  async getSuppliersByStatus(status: SupplierStatus): Promise<Supplier[]> {
    const suppliersFromRepo = await this._repository.getSuppliersByStatus(
      status
    );
    const suppliers = suppliersFromRepo.map(
      (supplier) => new Supplier(supplier)
    );

    return suppliers;
  }

  async getSupplierById(id: number): Promise<Supplier> {
    const supplierFromRepo = await this._repository.getById(id);
    const supplier = new Supplier(supplierFromRepo);

    return supplier;
  }

  async createSupplier(supplier: SupplierRequest): Promise<Supplier> {
    try {
      const newSupplier = await this._repository.addSupplier(supplier);
      return new Supplier(newSupplier);
    } catch (error) {
      throw new Error("Error adding supplier");
    }
  }

  async updateSupplier(supplier: SupplierRequest): Promise<Supplier> {
    if (!supplier.id) throw new Error("Supplier ID is required");

    try {
      const updateSupplier = await this._repository.updateSupplier(supplier);
      return new Supplier(updateSupplier);
    } catch (error) {
      throw new Error("Error updating supplier");
    }
  }

  async deleteSupplier(id: number): Promise<void> {
    if (!id) throw new Error("Supplier ID is required");

    await this._repository.deleteSupplier(id);
  }
}
