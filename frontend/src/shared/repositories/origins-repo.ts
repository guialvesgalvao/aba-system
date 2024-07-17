import axios from "axios";
import { OriginRequest, OriginResponse } from "../types/origins-types";

export class OriginsRepo {
  private _API_URL = "http://localhost:5000/api/origins";
  private _API_KEY = "ABA";

  async getAllOrigins(): Promise<OriginResponse[]> {
    const response = await axios.get<OriginResponse[]>(this._API_URL, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async getById(id: number): Promise<OriginResponse> {
    const response = await axios.get<OriginResponse>(
      `${this._API_URL}/${id}`,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async updateOrigin(origin: OriginRequest): Promise<OriginResponse> {
    const response = await axios.put<OriginResponse>(
      `${this._API_URL}/${origin.id}`,
      origin,
      {
        headers: {
          "X-API-KEY": this._API_KEY,
        },
      }
    );

    return response.data;
  }

  async addOrigin(origin: OriginRequest): Promise<OriginResponse> {
    const response = await axios.post<OriginResponse>(this._API_URL, origin, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });

    return response.data;
  }

  async deleteOrigin(id: number): Promise<void> {
    await axios.delete(`${this._API_URL}/${id}`, {
      headers: {
        "X-API-KEY": this._API_KEY,
      },
    });
  }
}
