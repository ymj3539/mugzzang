import {model} from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
    async findByProductTitle(productTitle){
        const product = await Product.findOne({productTitle})
        return productTitle;
    }


    async findById(shortId){
        const product = await Product.findOne({shortId : shortId});
        return product;
    }

    async create(productInfo) {
        const createNewProduct = await Product.create(productInfo);
        return createNewProduct;
    }

    async findAllProducts() {
        const product = await Product.find({});
        return product;
    }

    // async update

}

const productModel = new ProductModel();

export { productModel};