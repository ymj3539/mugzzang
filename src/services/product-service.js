import { productModel } from "../db";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ProductService {
    constructor (productModel) {
        this.productModel = productModel;
    }

    // 전체상품 조회
    async getProducts() {
        const products = await this.productModel.findAllProducts();
        return products;
    }

    // 개별 상품 조회
    async getProduct(shortId) {
        const product = await productModel.findById(shortId);
        return product;
    }

    // 상품 추가
    async addProduct (productInfo) {
        // const {prod_title, title_additional, price, img, category, description, manufacturer} = productInfo;

        // const newProductInfo = {
        //     prod_title : prod_title,
        //     title_additional : title_additional,
        //     price : price,
        //     img : img,
        //     category : category,
        //     description : description,
        //     manufacturer : manufacturer
        // }

        const product = await this.productModel.create(productInfo);

        return product;
    }





}

const productService = new ProductService(productModel);

export {productService};

