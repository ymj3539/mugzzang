import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const OrderProductSchema = new Schema({
  productTitle: String,
  productCount: Number,
});
const OrderSchema = new Schema(
  {
    shortId,
    email: {
      type: String,
      required: true,
    },

    productName: {
      type: [String],
      required: true,
    },

    productCount: {
      type: [Number],
      required: true,
    },

    priceTotal: {
      type: Number,
      required: true,
    },

    delivery: {
      type: new Schema(
        {
          name: String,
          phoneNumber: String,
          address: String,
        },
        {
          _id: false,
        }
      ),
      required: true,
    },

    // orderId: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export { OrderSchema };
