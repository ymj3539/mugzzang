import { body, validationResult } from 'express-validator';
import 'module-alias/register';
import { productModel } from '@db';

//유효성 에러 검사 함수
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ messasge: errors.array()[0] });
  }

  return next();
};

// 상품 정보 등록, 수정 - 상품 가격 유효성 검사
export const validateProductInfo = [
  body('price').isInt().notEmpty().withMessage('Invalid price'),
  validate,
];

// isNumeric;
