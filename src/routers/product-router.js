import {Router} from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { productService } from '../services/product-service';

const productRouter = Router();

// 전체 상품 조회
productRouter.get('/list', login_required, async(req,res,next)=>{
    try {
       
        const products = await productService.getProducts();

        res.status(200).json(products);

    } catch (error) {
        next(error);
    }

});

// 개별상품조회
productRouter.get('/list/:id', async(req,res,next)=>{
    try {
        if (is.emptyObject(req.params)) {
          throw new Error(
            '조회하려는 상품을 찾을 수 없습니다. 상품id를 확인해주세요.'
          );
        }

        const shortId = req.params.id;
        const product = await productService.getProduct(shortId);
        res.status(200).json(product);

    } catch(error){
        next(error);
    }
})

// 상품 등록
productRouter.post('/upload', login_required, async(req,res,next)=>{
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
              `headers의 Content-Type을 application/json으로 설정해주세요`
            )
          }
        const {prod_title, title_additional, price, img, category, description, manufacturer} = req.body; 

        const newProduct = await productService.addProduct({
            prod_title, title_additional, price, img, category, description, manufacturer
        });

        res.status(200).json(newProduct);

    } catch (error){
        next(error);
    }
})

// 상품 정보 수정
productRouter.patch('/update/:productId', login_required, async(req,res,next)=>{
try {
     
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const productId = req.params.productId;
    const {prod_title, title_additional, price,img,category, description, manufacturer, inStock} = req.body;

    const toUpdate = {
      ...(prod_title && {prod_title}),
      ...( title_additional && {title_additional}),
      ...( price && {price}),
      ...( img &&{img}),
      ...( category&&{category}),
      ...( description &&{ description}),
      ...( manufacturer &&{ manufacturer}),
      ...( inStock &&{inStock}),
      

    }

    const updatedProduct = await productService.updateProduct(productId, toUpdate);

    res.status(201).json(updatedProduct);


} catch {

}


})


export {productRouter};