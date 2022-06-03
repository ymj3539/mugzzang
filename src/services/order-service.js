import 'module-alias/register';
import { orderModel } from '@db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  //주문 정보 DB 등록
  async addOrder(orderInfo) {
    const newOrder = await this.orderModel.createOrder(orderInfo);
    if (!newOrder) {
      throw new Error('주문 정보를 추가할 수 없습니다.');
    }

    return newOrder;
  }

  //전체 주문 조회
  async getOrders() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  //개별 주문 조회
  async getOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    return order;
  }

  //사용자 이메일로 개별 주문 조회
  async getOrderByEmail(email) {
    const order = await this.orderModel.findByEmail(email);
    return order;
  }

  async deleteOrder(orderId) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new CustomError(
        400,
        '주문 내역이 없습니다. 다시 한 번 확인해주세요.'
      );
    }

    await this.orderModel.delete(orderId);
    return;
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
