import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
const Order = model('orders', OrderSchema);

export class OrderModel {
  async findById(orderId) {
    const order = await Order.findOne({ shortId: orderId });
    return order;
  }

  async findByEmail(email) {
    const user = await Order.find({ email: email });
    return user;
  }

  async update({ useremail, update }) {
    const filter = { email: useremail };
    const option = { returnOriginal: false };

    const updatedOrder = await Order.findOneAndUpdate(filter, update, option);

    return updatedOrder;
  }

  async delete(orderId) {
    await Order.findOneAndDelete({ shortId: orderId });
  }

  async findAll() {
    const orders = await Order.find({});
    return orders;
  }

  async createOrder(orderinfo) {
    const newOrder = await Order.create(orderinfo);
    return newOrder;
  }
}

const orderModel = new OrderModel();

export { orderModel };
