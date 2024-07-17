import { DeliveryPerson } from "../factories/delivery-persons-factory";
import { DeliveryPersonsModel } from "../models/delivery-persons-model";
import { DeliveryPersonsRepo } from "../repositories/delivery-persons-repo";
import { DeliveryPersonRequest } from "../types/delivery-persons-types";

export default class DeliveryPersonsService implements DeliveryPersonsModel {
  private _repository: DeliveryPersonsRepo;

  constructor() {
    this._repository = new DeliveryPersonsRepo();

    this.getDeliveryPersons = this.getDeliveryPersons.bind(this);
    this.getDeliveryPersonById = this.getDeliveryPersonById.bind(this);
    this.createDeliveryPerson = this.createDeliveryPerson.bind(this);
    this.updateDeliveryPerson = this.updateDeliveryPerson.bind(this);
    this.deleteDeliveryPerson = this.deleteDeliveryPerson.bind(this);
  }

  async getDeliveryPersons(): Promise<DeliveryPerson[]> {
    const deliveryPersonsFromRepo = await this._repository.getAllDeliveryPersons();
    const deliveryPersons = deliveryPersonsFromRepo.map((deliveryPerson) => new DeliveryPerson(deliveryPerson));

    return deliveryPersons;
  }

  async getDeliveryPersonById(id: number): Promise<DeliveryPerson> {
    const deliveryPersonFromRepo = await this._repository.getById(id);
    const deliveryPerson = new DeliveryPerson(deliveryPersonFromRepo);

    return deliveryPerson;
  }

  async createDeliveryPerson(deliveryPerson: DeliveryPersonRequest): Promise<DeliveryPerson> {
    try {
      const newDeliveryPerson = await this._repository.addDeliveryPerson(deliveryPerson);
      return new DeliveryPerson(newDeliveryPerson);
    } catch (error) {
      throw new Error("Error adding delivery person");
    }
  }

  async updateDeliveryPerson(deliveryPerson: DeliveryPersonRequest): Promise<DeliveryPerson> {
    if (!deliveryPerson.id) throw new Error("Delivery Person ID is required");

    try {
      const updatedDeliveryPerson = await this._repository.updateDeliveryPerson(deliveryPerson);
      return new DeliveryPerson(updatedDeliveryPerson);
    } catch (error) {
      throw new Error("Error updating delivery person");
    }
  }

  async deleteDeliveryPerson(id: number): Promise<void> {
    if (!id) throw new Error("Delivery Person ID is required");

    await this._repository.deleteDeliveryPerson(id);
  }
}
