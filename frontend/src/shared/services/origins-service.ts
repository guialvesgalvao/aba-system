import { Origin } from "../factories/origins-factory";
import { OriginsModel } from "../models/origins-model";
import { OriginsRepo } from "../repositories/origins-repo";
import { OriginRequest } from "../types/origins-types";

export default class OriginsService implements OriginsModel {
  private _repository: OriginsRepo;

  constructor() {
    this._repository = new OriginsRepo();

    this.getOrigins = this.getOrigins.bind(this);
    this.getOriginById = this.getOriginById.bind(this);
    this.createOrigin = this.createOrigin.bind(this);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.deleteOrigin = this.deleteOrigin.bind(this);
  }

  async getOrigins(): Promise<Origin[]> {
    const originsFromRepo = await this._repository.getAllOrigins();
    const origins = originsFromRepo.map((origin) => new Origin(origin));

    return origins;
  }

  async getOriginById(id: number): Promise<Origin> {
    const originFromRepo = await this._repository.getById(id);
    const origin = new Origin(originFromRepo);

    return origin;
  }

  async createOrigin(origin: OriginRequest): Promise<Origin> {
    try {
      const newOrigin = await this._repository.addOrigin(origin);
      return new Origin(newOrigin);
    } catch (error) {
      throw new Error("Error adding origin");
    }
  }

  async updateOrigin(origin: OriginRequest): Promise<Origin> {
    if (!origin.id) throw new Error("Origin ID is required");

    try {
      const updatedOrigin = await this._repository.updateOrigin(origin);
      return new Origin(updatedOrigin);
    } catch (error) {
      throw new Error("Error updating origin");
    }
  }

  async deleteOrigin(id: number): Promise<void> {
    if (!id) throw new Error("Origin ID is required");

    await this._repository.deleteOrigin(id);
  }
}
