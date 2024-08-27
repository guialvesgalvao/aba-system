import { Order } from "../factories/orders-factory";
import { OrderRequest, OrderStatus } from "../types/orders-types";

export abstract class OrdersModel {
  abstract getAllOrders(): Promise<Order[]>;
  abstract getOrdersByStatus(status: OrderStatus): Promise<Order[]>;
  abstract getOrderById(id: number): Promise<Order>;
  abstract createOrder(order: OrderRequest): Promise<Order>;
  abstract updateOrder(order: OrderRequest): Promise<Order>;
  abstract deleteOrder(id: number): Promise<void>;
}
