import { faker } from "@faker-js/faker";
import { ProductModel } from "../models/products-model";

export async function createProductsMockBasedOnLength(total: number) {
  const products = [];

  for (let i = 0; i < total; i++) {
    const product: ProductModel = {
      image: faker.image.url({
        width: 64,
        height: 64,
      }),
      id: faker.number.int({
        min: 1,
        max: total,
      }),
      title: faker.commerce.productName(),
      active: faker.helpers.arrayElement(["enabled", "draft", "archived"]),
      description: faker.commerce.productDescription(),
      created_at: faker.date.recent().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    };

    products.push(product);
  }

  return products;
}
