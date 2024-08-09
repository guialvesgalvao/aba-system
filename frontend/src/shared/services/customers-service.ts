import { Customer } from "../factories/customers-factory";
import { CustomersModel } from "../models/customers-model";
import { CustomersRepo } from "../repositories/customers-repo";
import { CustomerRequest, CustomerStatus } from "../types/customers-types";

export default class CustomersService implements CustomersModel {
  private _repository: CustomersRepo;

  constructor() {
    this._repository = new CustomersRepo();

    this.getAllCustomers = this.getAllCustomers.bind(this);
    this.getCustomersByStatus = this.getCustomersByStatus.bind(this);
    this.getCustomerById = this.getCustomerById.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  async getAllCustomers(): Promise<Customer[]> {
    const customersFromRepo = await this._repository.getAllCustomers();
    const customers = customersFromRepo.map((customer) => new Customer(customer));

    return customers;
  }

  async getCustomersByStatus(status: CustomerStatus): Promise<Customer[]> {
    const customersFromRepo = await this._repository.getCustomersByStatus(status);
    const customers = customersFromRepo.map((customer) => new Customer(customer));

    return customers;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customerFromRepo = await this._repository.getById(id);
    const customer = new Customer(customerFromRepo);

    return customer;
  }

  async createCustomer(customer: CustomerRequest): Promise<Customer> {
    try {
      const newCustomer = await this._repository.addCustomer(customer);
      return new Customer(newCustomer);
    } catch (error) {
      throw new Error("Error adding customer");
    }
  }

  async updateCustomer(customer: CustomerRequest): Promise<Customer> {
    if (!customer.id) throw new Error("Customer ID is required");

    try {
      const updatedCustomer = await this._repository.updateCustomer(customer);
      return new Customer(updatedCustomer);
    } catch (error) {
      throw new Error("Error updating customer");
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    if (!id) throw new Error("Customer ID is required");

    await this._repository.deleteCustomer(id);
  }
}
