import { model } from 'mongoose';
import 'module-alias/register';
import { ProductSchema } from '@db';

const Product = model('product', ProductSchema);

export class ProductModel {
  async findById(shortId) {
    const product = await Product.findOne({ shortId: shortId }).exec();
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

  async update({ productId, update }) {
    const filter = { shortId: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.updateMany(filter, update, option);
    return updatedProduct;
  }

  async delete(productId) {
    await Product.findOneAndDelete({ shortId: productId });
    return;
  }
}

const productModel = new ProductModel();

export { productModel };
