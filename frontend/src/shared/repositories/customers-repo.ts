import axios from "axios";
import { CustomerRequest, CustomerResponse } from "../types/customers-types";

export class CustomersRepo {
  private _API_URL = "http://localhost:5000/api/customers";
  private _API_KEY = "ABA";

  async getAllCustomers(): Promise<CustomerResponse[]> {
    const response = await axios.get<CustomerResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getCustomersByStatus(status: string): Promise<CustomerResponse[]> {
    const response = await axios.get<CustomerResponse[]>(
      `${this._API_URL}?status=${status}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async getById(id: number): Promise<CustomerResponse> {
    const response = await axios.get<CustomerResponse>(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async updateCustomer(customer: CustomerRequest): Promise<CustomerResponse> {
    const response = await axios.put<CustomerResponse>(
      `${this._API_URL}/${customer.id}`,
      customer,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addCustomer(customer: CustomerRequest): Promise<CustomerResponse> {
    const response = await axios.post<CustomerResponse>(this._API_URL, customer, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteCustomer(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
