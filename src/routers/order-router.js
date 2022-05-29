import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';
import { orderService } from '../services';

const orderRouter = Router();

//주문 하기(결제버튼 누르면 post 되는 부분)
orderRouter.post('/', loginRequired, async (req, res, next) => {
  try {
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
    } = req.body;

    const newOrder = await orderService.addOrder({
      email,
      productName,
      productCount,
      priceEach,
      priceTotal,
      delivery,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//주문 조회
orderRouter.get(
  '/orderlist/:orderId',
  loginRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error('조회하려는 주문ID가 정확한지 확인해주세요.');
      }
      const { orderId } = req.params;

      const order = await orderService.getOrder(orderId);

      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

//주문 삭제
orderRouter.delete(
  '/orderlist/:orderId',
  loginRequired,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.params)) {
        throw new Error('조회하려는 주문ID가 정확한지 확인해주세요.');
      }
      const { orderId } = req.params;

      const order = await orderService.deleteOrder(orderId);

      res.status(200).json({ message: '성공' });
    } catch (error) {
      next(error);
    }
  }
);

export { orderRouter };
