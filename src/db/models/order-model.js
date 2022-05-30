import {model} from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
const Order = model('orders', OrderSchema);

export class OrderModel {
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
      }
    
    async update({useremail, update}){
        const filter = {email : useremail};
        const option = {returnOriginal : false};

        const updatedOrder = await Order.findOneAndUpdate(filter, update, option);

        return updatedOrder;
    } 

    async delete(orderId) {
        await Order.findOneAndDelete({_id : orderId})
    }  

    //미사용시 삭제하기
    async findAll(){
        const orders = await Order.find({});
        return orders;
    }

    async createOrder (orderinfo) {
        const newOrder = await Order.create(orderinfo);
        return newOrder
    }
}

const orderModel = new OrderModel();

export {orderModel};