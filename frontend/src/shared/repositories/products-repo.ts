import axios from "axios";
import { ProductRequest, ProductResponse } from "../types/products-types";

export class ProductsRepo {
  private _API_URL = "http://localhost:5000/api/products";
  private _API_KEY = "ABA";

  async getAllProducts(): Promise<ProductResponse[]> {
    const response = await axios.get<ProductResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getProductsByStatus(status: string): Promise<ProductResponse[]> {
    const response = await axios.get<ProductResponse[]>(
      `${this._API_URL}?status=${status}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async getById(id: number): Promise<ProductResponse> {
    const response = await axios.get<ProductResponse>(
      `${this._API_URL}/${id}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async updateProduct(product: ProductRequest): Promise<ProductResponse> {
    const response = await axios.put<ProductResponse>(
      `${this._API_URL}/${product.id}`,
      product,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addProduct(product: ProductRequest): Promise<ProductResponse> {
    const response = await axios.post<ProductResponse>(this._API_URL, product, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
