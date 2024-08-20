import { faker } from "@faker-js/faker";
import { Order } from "../factories/orders-factory";
import { OrderResponse } from "../types/orders-types";

export async function createOrdersMockBasedOnLength(total: number) {
  const orders = [];

  for (let i = 0; i < total; i++) {
    const raw: OrderResponse = {
      id: i,
      status: faker.helpers.arrayElement(["enabled", "draft", "archived"]),
      client_id: faker.helpers.rangeToNumber({
        min: 1,
        max: 100,
      }),
      created_at: faker.date.recent().toISOString(),
      created_by: faker.person.fullName(),
      extra_details: faker.lorem.sentence(),
      invoicing_date: faker.date.recent().toISOString(),
      modified_at: faker.date.recent().toISOString(),
      modified_by: faker.person.fullName(),
      order_date: faker.date.recent().toISOString(),
      total_cost_value: faker.helpers.rangeToNumber({
        min: 1,
        max: 100,
      }),
      total_sale_value: faker.helpers.rangeToNumber({
        min: 1,
        max: 100,
      }),
    };

    const order = new Order(raw);

    orders.push(order);
  }

  return orders;
}
