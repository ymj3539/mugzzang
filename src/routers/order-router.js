import {Router} from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import {orderService} from '../services';

const orderRouter = Router();

//상품을 DB에 등록하기
orderRouter.post('/register',loginRequired, async(req,res,next)=>{

    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
              'headers의 Content-Type을 application/json으로 설정해주세요'
            );
          }
        
        const {email, productTitle,priceEach, priceCount, priceTotal, delivery} = req.body;

        const newOrder = await orderService.addOrder({email,
          productTitle,
          priceEach, 
          priceCount, 
          priceTotal,
           delivery 
          });
            
        res.status(200).json(newOrder);


    } catch (error ){
      next(error);
    }

})

//등록된 상품 조회하기
orderRouter.get('/orderlist/:orderId',loginRequired, async (req,res,next) =>{
  try {
    if (is.emptyObject(req.params)) {
      throw new Error('조회하려는 주문ID가 정확한지 확인해주세요.');
    }
    const {orderId} = req.params;


    const order = await orderService.getOrder(orderId);
  
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
  
})

export {orderRouter};