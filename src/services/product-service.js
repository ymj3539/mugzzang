import 'module-alias/register';
import { productModel } from '@db';
import { CustomError } from '@error';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 전체상품 조회
  async getProducts() {
    const products = await this.productModel.findAllProducts();
    if (!products) {
      throw new Error('전체 상품 목록을 찾을 수 없습니다.');
    }
    return products;
  }

  // 개별 상품 조회
  async getProduct(shortId) {
    const product = await productModel.findById(shortId);

    if (!product) {
      throw new CustomError(
        400,
        '해당 상품이 없습니다. 상품id를 다시 확인해주세요.'
      );
    }

    return product;
  }

  // 상품 등록
  async addProduct(productInfo) {
    const product = await this.productModel.create(productInfo);
    if (!product) {
      throw new Error('상품을 등록할 수 없습니다');
    }

    return product;
  }

  //상품 정보 수정
  async updateProduct(productId, toUpdate) {
    let product = await this.productModel.findById(productId);

    if (!product) {
      throw new CustomError(
        400,
        '해당 상품이 없습니다. 상품id를 다시 확인해주세요.'
      );
    }

    product = await this.productModel.update({ productId, update: toUpdate });

    return product;
  }

  // 상품 정보 삭제
  async deleteProduct(productId) {
    let product = await productModel.findById(productId);

    if (!product) {
      throw new CustomError(
        400,
        '해당 상품이 없습니다. 상품id를 다시 확인해주세요.'
      );
    }
    await this.productModel.delete(productId);
    return;
  }
}

const productService = new ProductService(productModel);

export { productService };
