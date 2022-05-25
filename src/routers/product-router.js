import {Router} from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { productService } from '../services/product-service';

const productRouter = Router();

// 전체 상품 조회
productRouter.get('/list', async(req,res,next)=>{
    try {
        if(is.emptyObject(req.body)) {
            throw new Error(
              'headers의 Content-Type을 application/json으로 설정해주세요'
            );
          }
        
        const {prod_title, title_additional, price, img, category, description, manufacturer} = req.body;

        const newProduct = await productService.getProducts({prod_title, title_additional, price, img, category, description, manufacturer});

        res.status(200).json(newProduct);



    } catch (error) {
        next(error);
    }

});

// 개별상품조회
productRouter.get('/products/:id', async(req,res,next)=>{
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
productRouter.post('/products/upload', async(req,res,next)=>{
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
              `headers의 Content-Type을 application/json으로 설정해주세요`
            )
          }
        const {prod_title, title_additional, price, img, category, description, manufacturer} = req.body; 

        const newProudct = await productService.addProduct({
            prod_title, title_additional, price, img, category, description, manufacturer
        });

        res.status(200).json(newProduct);

    } catch (error){
        next(error);
    }
})

export {productRouter};