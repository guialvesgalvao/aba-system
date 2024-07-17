import { Origin } from "../factories/origins-factory";
import { OriginRequest } from "../types/origins-types";

export abstract class OriginsModel {
  abstract getOrigins(): Promise<Origin[]>;
  abstract getOriginById(id: number): Promise<Origin>;
  abstract createOrigin(origin: OriginRequest): Promise<Origin>;
  abstract updateOrigin(origin: OriginRequest): Promise<Origin>;
  abstract deleteOrigin(id: number): Promise<void>;
}
