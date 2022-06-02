import 'module-alias/register';
import { orderModel } from '@db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  //주문 정보 DB 등록
  async addOrder(orderInfo) {
    const newOrder = await this.orderModel.createOrder(orderInfo);

    return newOrder;
  }

  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('order not found');
    }
    return order;
  }

  async getOrderByEmail(email) {
    const order = await this.orderModel.findByEmail(email);
    if (order.length == 0) {
      throw new Error('order not found');
    }
    return order;
  }

  async deleteOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('order not found');
    }

    await this.orderModel.delete(orderId);
    return;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
