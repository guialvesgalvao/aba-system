import { faker } from "@faker-js/faker";
import { ProductResponse } from "../types/products-types";
import { Product } from "../factories/products-factory";

export async function createProductsMockBasedOnLength(total: number) {
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

    const product = new Product(raw);

    products.push(product);
  }

  return products;
}
