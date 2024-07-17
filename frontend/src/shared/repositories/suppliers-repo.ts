import axios from "axios";
import { SupplierRequest, SupplierResponse } from "../types/suppliers-types";

export class SuppliersRepo {
  private _API_URL = "http://localhost:5000/api/suppliers";
  private _API_KEY = "ABA";

  async getAllSuppliers(): Promise<SupplierResponse[]> {
    const response = await axios.get<SupplierResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getById(id: number): Promise<SupplierResponse> {
    const response = await axios.get<SupplierResponse>(
      `${this._API_URL}/${id}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async updateSupplier(supplier: SupplierRequest): Promise<SupplierResponse> {
    const response = await axios.put<SupplierResponse>(
      `${this._API_URL}/${supplier.id}`,
      supplier,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addSupplier(supplier: SupplierRequest): Promise<SupplierResponse> {
    const response = await axios.post<SupplierResponse>(this._API_URL, supplier, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteSupplier(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
