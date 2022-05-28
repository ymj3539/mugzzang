import {Schema} from 'mongoose';
import {shortId} from './types/short-id';

const OrderSchema = new Schema({
    shortId, 
    email : {
        type : String,
        required : true
    },
    productTitle : {
        type : String,
        required : true
    },
    price : [{
        price_each : {
            type : Number,
            required : true
        },
        count : {
            type : Number,
            required : true
        },

        total : {
            type : Number,
            required : true
        }
    }],

    delivery : [{
        name : {
            type : String,
            required : true
        },
        contact : {
            type : [String],
            required : true
        },
        address : {
            type: String,
            required : true
        },

        
    }],

    orderNumber : {
        type : String,
        required : false
    }

}, {
    collection: 'orders',
    timestamps: true,
  });

  export {OrderSchema};