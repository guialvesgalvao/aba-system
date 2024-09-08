import { SuppliersProductsRepo } from "../repositories/suppliers-products-repo";

export class SuppliersProductsService {
  private _repositorySuppliersProducts: SuppliersProductsRepo;

  constructor() {
    this._repositorySuppliersProducts = new SuppliersProductsRepo();

    this.getSuppliersProductsExtended =
      this.getSuppliersProductsExtended.bind(this);
  }

  async getSuppliersProductsExtended(id: number) {
    return await this._repositorySuppliersProducts.getSuppliersProductsExtended(
      id
    );
  }
}
