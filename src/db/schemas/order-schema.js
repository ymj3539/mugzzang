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
    
    priceEach : {
            type : Number,
            required : true
        },

    priceCount : {
            type : Number,
            required : true
        },

    priceTotal : {
            type : Number,
            required : true
        }
    ,

  
    delivery : {
        type : new Schema({
            name : String,
            contact : String,
            address: String
        },
        {
            _id: false,
          }
        ),
        required : true   
    },   
   

    orderNumber : {
        type : String,
        required : false
    }

}, {
    collection: 'orders',
    timestamps: true,
  });

  export {OrderSchema};