import 'module-alias/register';
import { productModel } from '@db';

class ProductService {
  constructor(productModel) {
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

    if (!product) {
      throw new Error('product not found');
    }

    return product;
  }

  // 상품 등록
  async addProduct(productInfo) {
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

  //상품 정보 수정
  async updateProduct(productId, toUpdate) {
    let product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error('product not found');
    }

    product = await this.productModel.update({ productId, update: toUpdate });

    return product;
  }

  // 상품 정보 삭제
  async deleteProduct(productId) {
    let product = await productModel.findById(productId);

    if (!product) {
      throw new Error('product not found');
    }

    await this.productModel.delete(productId);
    return;
  }
}

const productService = new ProductService(productModel);

export { productService };
