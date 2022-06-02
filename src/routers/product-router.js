import { Router } from 'express';
import is from '@sindresorhus/is';
import 'module-alias/register';
import { loginRequired } from '@middlewares';
import { adminRequired } from '@middlewares';
import { productService } from '@services';
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const productRouter = Router();

// 전체 상품 조회
productRouter.get('/list', loginRequired, async (req, res, next) => {
  try {
    const products = await productService.getProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 개별상품조회
productRouter.get('/list/:shortId', async (req, res, next) => {
  try {
    if (is.emptyObject(req.params)) {
      throw new Error(
        '조회하려는 상품을 찾을 수 없습니다. 상품id를 확인해주세요.'
      );
    }

    const { shortId } = req.params;
    const product = await productService.getProduct(shortId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// 상품 등록(이미지)
productRouter.post('/upload', async function (req, res, next) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log('files : ', files);
      const file = files.image; // key를 image로 지정하고 파일을 보내줬기 때문에 files.image로 파일을 가져옴
      const dir = `public`;
      !fs.existsSync(dir) && fs.mkdirSync(dir);
      const newPath = path.join(
        __dirname,
        '..',
        `${dir}/${file.originalFilename}`
      ); //__dirname : 현재경로 가져오기
      fs.renameSync(file.filepath, newPath); //파일명 변경 : fs.renameSync(이전경로, 현재경로)
      res.json({ result: `${file.originalFilename}` });
    });
  } catch (err) {
    console.log('err : ', err);
    next(err);
  }
});

// 상품 등록
productRouter.post(
  '/',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          `headers의 Content-Type을 application/json으로 설정해주세요`
        );
      }
      const {
        prod_title,
        title_additional,
        price,
        img,
        category,
        description,
        manufacturer,
      } = req.body;

      const newProduct = await productService.addProduct({
        prod_title,
        title_additional,
        price,
        img,
        category,
        description,
        manufacturer,
      });

      res.status(200).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// 상품 정보 수정
productRouter.patch(
  '/update/:productId',
  loginRequired,
  adminRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요'
        );
      }

      const productId = req.params.productId;
      const {
        prod_title,
        title_additional,
        price,
        img,
        category,
        description,
        manufacturer,
        inStock,
      } = req.body;

      const toUpdate = {
        ...(prod_title && { prod_title }),
        ...(title_additional && { title_additional }),
        ...(price && { price }),
        ...(img && { img }),
        ...(category && { category }),
        ...(description && { description }),
        ...(manufacturer && { manufacturer }),
        ...(inStock && { inStock }),
      };

      const updatedProduct = await productService.updateProduct(
        productId,
        toUpdate
      );

      res.status(201).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// 상품 삭제("productId에 shortId가 들어가야됨")
productRouter.delete(
  '/delete/:productId',
  loginRequired,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      await productService.deleteProduct(productId);
      res.status(200).json({ message: '상품이 삭제되었습니다' });
    } catch (error) {
      next(error);
    }
  }
);

export { productRouter };
