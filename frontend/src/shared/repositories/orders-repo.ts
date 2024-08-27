import axios from "axios";
import { OrderRequest, OrderResponse } from "../types/orders-types";

export class OrdersRepo {
  private _API_URL = "http://localhost:5000/api/orders";
  private _API_SPECIFIC_URL = "http://localhost:5000/api/order_full";
  private _API_KEY = "ABA";

  async getAllOrders(): Promise<OrderResponse[]> {
    const response = await axios.get<OrderResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getOrdersByStatus(status: string): Promise<OrderResponse[]> {
    const response = await axios.get<OrderResponse[]>(
      `${this._API_URL}?status=${status}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async getOrderExtended(order_id: number): Promise<OrderResponse> {
    const response = await axios.get<OrderResponse>(`${this._API_SPECIFIC_URL}/${order_id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getById(id: number): Promise<OrderResponse> {
    const response = await axios.get<OrderResponse>(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async updateOrder(order: OrderRequest): Promise<OrderResponse> {
    const response = await axios.put<OrderResponse>(
      `${this._API_URL}/${order.id}`,
      order,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addOrder(order: OrderRequest): Promise<OrderResponse> {
    const response = await axios.post<OrderResponse>(this._API_URL, order, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteOrder(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
