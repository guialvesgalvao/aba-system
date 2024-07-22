import { faker } from "@faker-js/faker";
import { CNPJ } from "../helpers/cnpj-helper/cnpj-helper";
import { ProductResponse } from "../types/products-types";
import { SupplierResponse } from "../types/suppliers-types";
import { SupplierProductResponse } from "../types/suppliers-products-types";

export function createProductsMockBasedOnLength(total: number) {
  const products = [];

  for (let i = 0; i < total; i++) {
    const raw: ProductResponse = {
      id: i,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      status: faker.helpers.arrayElement(["enabled", "draft", "archived"]),
      created_at: faker.date.recent().toISOString(),
      modified_at: faker.date.recent().toISOString(),
      created_by: faker.person.fullName(),
      modified_by: faker.person.fullName(),
    };

    products.push(raw);
  }

  return products;
}

export function createSuppliersMockBasedOnLength(total: number) {
  const suppliers = [];

  for (let i = 0; i < total; i++) {
    const raw: SupplierResponse = {
      id: i,
      name: faker.company.name(),
      cnpj: new CNPJ().value,
      automatic_invoicing: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(["enabled", "draft", "archived"]),
      created_at: faker.date.recent().toISOString(),
      modified_at: faker.date.recent().toISOString(),
      created_by: faker.person.fullName(),
      modified_by: faker.person.fullName(),
    };

    suppliers.push(raw);
  }

  return suppliers;
}

export function createSuppliersProductsMockBasedOnLength(total: number) {
  const suppliers = [];

  for (let i = 0; i < total; i++) {
    const raw: SupplierProductResponse = {
      id: i,
      value: faker.number.int({ min: 0, max: 30000 }),
      validity_period: faker.number.int({ min: 0, max: 30 }),
      supplier_id: faker.number.int({ min: 0, max: 10 }),
      product_id: faker.number.int({ min: 0, max: 10 }),
      created_at: faker.date.recent().toISOString(),
      modified_at: faker.date.recent().toISOString(),
      created_by: faker.person.fullName(),
      modified_by: faker.person.fullName(),
    };

    suppliers.push(raw);
  }

  return suppliers;
}
