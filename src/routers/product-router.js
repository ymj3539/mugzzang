import {Router} from 'express';
import is from '@sindresorhus/is';
import 'module-alias/register';
import {loginRequired} from '@middlewares';
import {adminRequired} from '@middlewares';
import {productService} from '@services';
import {asyncHandler} from '@asyncHandler';
import {CustomError} from '@error';

//이미지 업로드시 필요 모듈 ES6문법으로 변환
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';

const productRouter = Router();

// 전체 상품 조회
productRouter.get(
  '/list',
  asyncHandler(async (req, res, next) => {
    const products = await productService.getProducts();
    if (!products) {
      throw new CustomError(500, `조회하신 상품 내역이 존재하지 않습니다.`);
    }
    res.status(200).json(products);
  })
);

// 개별상품조회
productRouter.get(
  '/list/:shortId',
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.params)) {
      throw new CustomError(400, '조회하려는 상품을 찾을 수 없습니다. 상품id를 확인해주세요.');
    }
    const {shortId} = req.params;
    const product = await productService.getProduct(shortId);
    res.status(200).json(product);
  })
);

// 상품 등록(이미지)
productRouter.post(
  '/upload',
  loginRequired,
  adminRequired,
  asyncHandler(async function (req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const file = files.image; // key를 image로 지정하고 파일을 보내줬기 때문에 files.image로 파일을 가져옴
      const dir = `public`;
      !fs.existsSync(dir) && fs.mkdirSync(dir);
<<<<<<< HEAD
      const newPath = path.join(__dirname, '..', `${dir}/${file.originalFilename}`); //__dirname : 현재경로 가져오기
      fs.renameSync(file.filepath, newPath); //파일명 변경 : fs.renameSync(이전경로, 현재경로)
      res.json({result: `${file.originalFilename}`});
=======
      const newPath = path.join(
        __dirname,
        '..',
        `${dir}/${file.originalFilename}`
      ); //__dirname : 현재경로 가져오기, 파일명 변경
      fs.renameSync(file.filepath, newPath); //파일 경로 변경 : fs.renameSync(이전경로, 현재경로)
      res.json({ result: `${file.originalFilename}` });
>>>>>>> 4a034b64b02b3ad9693a840f8155f2546d948205
    });
  })
);

// 상품 등록
productRouter.post(
  '/',
  loginRequired,
  adminRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new CustomError(400, `headers의 Content-Type을 application/json으로 설정해주세요`);
    }
    const {prod_title, title_additional, price, img, category, description, manufacturer} = req.body;

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
  })
);

// 상품 정보 수정
productRouter.patch(
  '/update/:productId',
  loginRequired,
  adminRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new CustomError(400, 'headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const {productId} = req.params;
    if (!productId) {
      throw new CustomError(400, '해당 상품이 없습니다. 상품id를 다시 확인해주세요.');
    }
    const {prod_title, title_additional, price, img, category, description, manufacturer, inStock} = req.body;

    const toUpdate = {
      ...(prod_title && {prod_title}),
      ...(title_additional && {title_additional}),
      ...(price && {price}),
      ...(img && {img}),
      ...(category && {category}),
      ...(description && {description}),
      ...(manufacturer && {manufacturer}),
      ...(inStock && {inStock}),
    };

    const updatedProduct = await productService.updateProduct(productId, toUpdate);

    res.status(201).json(updatedProduct);
  })
);

// 상품 삭제("productId에 shortId가 들어가야됨")
productRouter.delete(
  '/delete/:productId',
  loginRequired,
  adminRequired,
  asyncHandler(async (req, res, next) => {
    const {productId} = req.params;
    if (!productId) {
      throw new CustomError(400, '해당 상품이 없습니다. 상품id를 다시 확인해주세요.');
    }
    await productService.deleteProduct(productId);

    res.status(200).json({message: '상품이 삭제되었습니다'});
  })
);

export {productRouter};
