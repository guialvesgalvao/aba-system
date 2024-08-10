import { Order } from "../factories/orders-factory";
import { OrdersModel } from "../models/orders-model";
import { OrdersRepo } from "../repositories/orders-repo";
import { OrderRequest, OrderStatus } from "../types/orders-types";

export default class OrdersService implements OrdersModel {
  private _repository: OrdersRepo;

  constructor() {
    this._repository = new OrdersRepo();

    this.getAllOrders = this.getAllOrders.bind(this);
    this.getOrdersByStatus = this.getOrdersByStatus.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  async getAllOrders(): Promise<Order[]> {
    const ordersFromRepo = await this._repository.getAllOrders();
    const orders = ordersFromRepo.map((order) => new Order(order));

    return orders;
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    const ordersFromRepo = await this._repository.getOrdersByStatus(status);
    const orders = ordersFromRepo.map((order) => new Order(order));

    return orders;
  }

  async getOrderById(id: number): Promise<Order> {
    const orderFromRepo = await this._repository.getById(id);
    const order = new Order(orderFromRepo);

    return order;
  }

  async createOrder(order: OrderRequest): Promise<Order> {
    try {
      const newOrder = await this._repository.addOrder(order);
      return new Order(newOrder);
    } catch (error) {
      throw new Error("Error adding order");
    }
  }

  async updateOrder(order: OrderRequest): Promise<Order> {
    if (!order.id) throw new Error("Order ID is required");

    try {
      const updatedOrder = await this._repository.updateOrder(order);
      return new Order(updatedOrder);
    } catch (error) {
      throw new Error("Error updating order");
    }
  }

  async deleteOrder(id: number): Promise<void> {
    if (!id) throw new Error("Order ID is required");

    await this._repository.deleteOrder(id);
  }
}
