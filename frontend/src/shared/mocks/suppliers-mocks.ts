import { faker } from "@faker-js/faker";
import { SupplierResponse } from "../types/suppliers-types";
import { Supplier } from "../factories/suppliers-factory";

import { CNPJ } from "../helpers/cnpj-helper/cnpj-helper";

export async function createSuppliersMockBasedOnLength(total: number) {
  const suppliers = [];

  for (let i = 0; i < total; i++) {
    const raw: SupplierResponse = {
      id: i,
      name: faker.company.name(),
      cnpj: new CNPJ().formatCNPJ(),
      automatic_invoicing: faker.datatype.boolean(),
      status: faker.helpers.arrayElement(["enabled", "draft", "archived"]),
      created_at: faker.date.recent().toISOString(),
      modified_at: faker.date.recent().toISOString(),
      created_by: faker.person.fullName(),
      modified_by: faker.person.fullName(),
    };

    const supplier = new Supplier(raw);

    suppliers.push(supplier);
  }

  return suppliers;
}
