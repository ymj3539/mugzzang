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
        const products = await Product.find({});
        return products;
    }

    async addInStock (num){
        const products = await Product.findOneAndUpdate({inStock : num})
        return products;
    }

}

const productModel = new ProductModel();

export { productModel};

