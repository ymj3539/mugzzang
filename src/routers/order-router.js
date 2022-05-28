import {Router} from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import {orderService} from '../services';

const orderRouter = Router();

orderRouter.post('/register',loginRequired, async(req,res,next)=>{

    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
              'headers의 Content-Type을 application/json으로 설정해주세요'
            );
          }
        
          const { productTitle,price,delivery, orderNumber } = req.body;

          const newOrder = await orderService.addOrder({productTitle,
            price,
            delivery, 
            orderNumber});
            
        res.status(201).json(newOrder);


    } catch (error ){
      next(error);
    }

})

export {orderRouter};