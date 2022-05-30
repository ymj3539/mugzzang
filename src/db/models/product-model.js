<<<<<<< HEAD
import {model} from 'mongoose';
import {ProductSchema} from '../schemas/product-schema';
=======
import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';
>>>>>>> bd36011e6201cf7119aed1ca30fb9761e30838d8

const Product = model('product', ProductSchema);

export class ProductModel {
  async findById(shortId) {
<<<<<<< HEAD
    const product = await Product.findOne({shortId: shortId}).exec();
=======
    const product = await Product.findOne({ shortId: shortId }).exec();
>>>>>>> bd36011e6201cf7119aed1ca30fb9761e30838d8
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

<<<<<<< HEAD
  async update({productId, update}) {
    const filter = {shortId: productId};
    const option = {returnOriginal: false};
=======
  async update({ productId, update }) {
    const filter = { shortId: productId };
    const option = { returnOriginal: false };
>>>>>>> bd36011e6201cf7119aed1ca30fb9761e30838d8

    const updatedProduct = await Product.updateMany(filter, update, option);
    return updatedProduct;
  }

  async delete(productId) {
<<<<<<< HEAD
    await Product.findOneAndDelete({shortId: productId});
=======
    await Product.findOneAndDelete({ shortId: productId });
>>>>>>> bd36011e6201cf7119aed1ca30fb9761e30838d8
    return;
  }
}

const productModel = new ProductModel();

<<<<<<< HEAD
export {productModel};
=======
export { productModel };
>>>>>>> bd36011e6201cf7119aed1ca30fb9761e30838d8
