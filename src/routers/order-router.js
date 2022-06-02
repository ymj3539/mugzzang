import { Router } from 'express';
import is from '@sindresorhus/is';
import 'module-alias/register';
import { loginRequired } from '@middlewares';
import { adminRequired } from '@middlewares';
import { orderService } from '@services';
import { asyncHandler } from '@asyncHandler';

const orderRouter = Router();

//주문 등록(결제버튼 누르면 post 되는 부분)
orderRouter.post('/', loginRequired, asyncHandler(async (req, res, next) => {
 
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const {
      email,
      productName,
      productCount,
      priceEach,
      priceTotal,
      delivery,
      productShortId,
      orderId,
    } = req.body;

    const newOrder = await orderService.addOrder({
      email,
      productName,
      productCount,
      priceEach,
      priceTotal,
      delivery,
      productShortId,
      orderId,
    });

    res.status(200).json(newOrder);
 
}));

// 관리자용  전체 주문 조회 
orderRouter.get('/orderlist', loginRequired, adminRequired, asyncHandler(async (req, res, next) => {
  
   
    const orders = await orderService.getOrders();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(orders);
  
}));

//개별 주문 조회(주문 번호로 조회)
orderRouter.get(
  '/orderlist/:orderId',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    
      if (is.emptyObject(req.params)) {
        throw new Error('조회하려는 주문ID가 정확한지 확인해주세요.');
      }
      const { orderId } = req.params;

      const order = await orderService.getOrder(orderId);

      res.status(200).json(order);
    
}));

//개별 주문 조회(사용자 이메일로 조회)
orderRouter.get('/:email', loginRequired, asyncHandler(async (req, res, next) => {
  
    if (is.emptyObject(req.params)) {
      throw new Error('조회하려는 email이 정확한지 확인해주세요.');
    }
    const { email } = req.params;

    const order = await orderService.getOrderByEmail(email);

    res.status(200).json(order);
  
}));

//주문 삭제
orderRouter.delete(
  '/orderlist/:orderId',
  loginRequired,
  asyncHandler(async (req, res, next) => {
   
      if (is.emptyObject(req.params)) {
        throw new Error('조회하려는 주문ID가 정확한지 확인해주세요.');
      }
      const { orderId } = req.params;

      const order = await orderService.deleteOrder(orderId);

      res.status(200).json({ message: '성공' });
   
}));

export { orderRouter };
