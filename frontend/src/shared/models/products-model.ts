import { Product } from "../factories/products-factory";
import { ProductRequest } from "../types/products-types";

export abstract class ProductsModel {
  abstract getProducts(): Promise<Product[]>;
  abstract getProductById(id: number): Promise<Product>;
  abstract createProduct(product: ProductRequest): Promise<Product>;
  abstract updateProduct(product: ProductRequest): Promise<Product>;
  abstract deleteProduct(id: number): Promise<void>;
}
