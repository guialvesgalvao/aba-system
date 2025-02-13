import { Origin } from "../factories/origins-factory";
import { OriginRequest, OriginStatus } from "../types/origins-types";

export abstract class OriginsModel {
  abstract getAllOrigins(): Promise<Origin[]>;
  abstract getOriginsByStatus(status: OriginStatus): Promise<Origin[]>;
  abstract getOriginById(id: number): Promise<Origin>;
  abstract createOrigin(origin: OriginRequest): Promise<Origin>;
  abstract updateOrigin(origin: OriginRequest): Promise<Origin>;
  abstract deleteOrigin(id: number): Promise<void>;
}
