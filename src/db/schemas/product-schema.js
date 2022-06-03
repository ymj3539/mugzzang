import { Schema } from 'mongoose';
// const audtoIncrement = require('mongoose-auto-increment');  //리팩토랭시 --legacy-peer-deps로 install 고려해보기
import {shortId} from './types/short-id';
const ProductSchema = new Schema(
    {
        shortId, 

        prod_title : {
            type : String,
            required :[true, "product title is required"]
        },

        title_additional : {
            type : String,
            required : false
        },

        price : {
            type : Number,
            required : true
        },
        
        img : {
            type: String,
            required : false
        },

        category : {
            type : [String],
            required : true
        },


        description : {
            type : String,
            required : false
        },

        manufacturer: {
            type : String,
            required : false
        },

        inStock : {
            type: Number,
            required : true,
            default : 10
        }
}, {
    collection: 'product',
    timestamps: true,
  });

export {ProductSchema};