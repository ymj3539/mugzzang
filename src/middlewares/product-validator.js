import {body, validationResult} from 'express-validator';

//상품 가격이 숫자가 아닐 경우 현재 코드에서 500에러로 넘어가는 버그 생김
// 상품 가격 유효성 검사 validator 추가함

const validate = (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ reason : errors.array()[1]})};

    return next();
};

export const validateProductPrice = [
    body('price')
    .isEmpty()
    .isNumeric()
    .withMessage('Set price in Number type'),

    validate

];   

