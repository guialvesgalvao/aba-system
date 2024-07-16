import axios from "axios";
import { DeliveryPersonRequest, DeliveryPersonResponse } from "../types/delivery-persons-types";

export class DeliveryPersonsRepo {
  private _API_URL = "http://localhost:5000/api/delivery-persons";
  private _API_KEY = "ABA";

  async getAllDeliveryPersons(): Promise<DeliveryPersonResponse[]> {
    const response = await axios.get<DeliveryPersonResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getById(id: number): Promise<DeliveryPersonResponse> {
    const response = await axios.get<DeliveryPersonResponse>(
      `${this._API_URL}/${id}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async updateDeliveryPerson(deliveryPerson: DeliveryPersonRequest): Promise<DeliveryPersonResponse> {
    const response = await axios.put<DeliveryPersonResponse>(
      `${this._API_URL}/${deliveryPerson.id}`,
      deliveryPerson,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addDeliveryPerson(deliveryPerson: DeliveryPersonRequest): Promise<DeliveryPersonResponse> {
    const response = await axios.post<DeliveryPersonResponse>(this._API_URL, deliveryPerson, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteDeliveryPerson(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
