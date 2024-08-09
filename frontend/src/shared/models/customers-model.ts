import { Customer } from "../factories/customers-factory";
import { CustomerRequest, CustomerStatus } from "../types/customers-types";

export abstract class CustomersModel {
  abstract getAllCustomers(): Promise<Customer[]>;
  abstract getCustomersByStatus(status: CustomerStatus): Promise<Customer[]>;
  abstract getCustomerById(id: number): Promise<Customer>;
  abstract createCustomer(customer: CustomerRequest): Promise<Customer>;
  abstract updateCustomer(customer: CustomerRequest): Promise<Customer>;
  abstract deleteCustomer(id: number): Promise<void>;
}
