import axios from "axios";
import {
  SupplierProductRequest,
  SupplierProductResponse,
} from "../types/suppliers-products-types";

export class SuppliersProductsRepo {
  private _API_URL = "http://localhost:5000/api/suppliers_products";
  private _API_KEY = "ABA";

  async getAllSuppliersProducts(): Promise<SupplierProductResponse[]> {
    const response = await axios.get<SupplierProductResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getById(id: number): Promise<SupplierProductResponse> {
    const response = await axios.get<SupplierProductResponse>(
      `${this._API_URL}/${id}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async updateSupplierProducts(
    supplierProduct: SupplierProductRequest
  ): Promise<SupplierProductResponse> {
    const response = await axios.put<SupplierProductResponse>(
      `${this._API_URL}/${supplierProduct.id}`,
      supplierProduct,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addSupplierProduct(
    supplierProduct: SupplierProductRequest
  ): Promise<SupplierProductResponse> {
    const response = await axios.post<SupplierProductResponse>(
      this._API_URL,
      supplierProduct,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async deleteSupplierProduct(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
