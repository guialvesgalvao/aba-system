import { Product } from "../factories/products-factory";
import { ProductsModel } from "../models/products-model";
import { ProductsRepo } from "../repositories/products-repo";
import { ProductRequest, ProductStatus } from "../types/products-types";

export default class ProductsService implements ProductsModel {
  private _repository: ProductsRepo;

  constructor() {
    this._repository = new ProductsRepo();

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductsByStatus = this.getProductsByStatus.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getAllProducts(): Promise<Product[]> {
    const productsFromRepo = await this._repository.getAllProducts();
    const products = productsFromRepo.map((product) => new Product(product));

    return products;
  }

  async getProductsByStatus(status: ProductStatus): Promise<Product[]> {
    const productsFromRepo = await this._repository.getProductsByStatus(status);
    const products = productsFromRepo.map((product) => new Product(product));

    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const productFromRepo = await this._repository.getById(id);
    const product = new Product(productFromRepo);

    return product;
  }

  async createProduct(product: ProductRequest): Promise<Product> {
    try {
      const newProduct = await this._repository.addProduct(product);
      return new Product(newProduct);
    } catch (error) {
      throw new Error("Error adding product");
    }
  }

  async updateProduct(product: ProductRequest): Promise<Product> {
    if (!product.id) throw new Error("Product ID is required");

    try {
      const updatedProduct = await this._repository.updateProduct(product);
      return new Product(updatedProduct);
    } catch (error) {
      throw new Error("Error updating product");
    }
  }

  async deleteProduct(id: number): Promise<void> {
    if (!id) throw new Error("Product ID is required");

    await this._repository.deleteProduct(id);
  }
}
