import { DeliveryPerson } from "../factories/delivery-persons-factory";
import {
  DeliveryPersonRequest,
  DeliveryPersonStatus,
} from "../types/delivery-persons-types";

export abstract class DeliveryPersonsModel {
  abstract getAllDeliveryPersons(): Promise<DeliveryPerson[]>;
  abstract getDeliveryPersonsByStatus(
    status: DeliveryPersonStatus
  ): Promise<DeliveryPerson[]>;
  abstract getDeliveryPersonById(id: number): Promise<DeliveryPerson>;
  abstract createDeliveryPerson(
    origin: DeliveryPersonRequest
  ): Promise<DeliveryPerson>;
  abstract updateDeliveryPerson(
    origin: DeliveryPersonRequest
  ): Promise<DeliveryPerson>;
  abstract deleteDeliveryPerson(id: number): Promise<void>;
}
