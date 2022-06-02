// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  switch (error.message) {
    case 'existed Email':
      res.status(409).json({
        status: 409,
        reason: `이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.`,
      });
    case 'invalid password':
      res.status(401).json({
        status: 401,
        reason: '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      });

    case 'user not found':
      res.status(404).json({
        status: 404,
        reason: `해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`,
      });

    case 'product not found':
      res.status(404).json({
        status: 404,
        reason: `해당 상품이 없습니다. 상품id를 다시 확인해주세요.`,
      });
    case 'order not found':
      res.status(404).json({
        status: 404,
        reason: `주문 내역이 없습니다. 다시 한 번 확인해주세요.`,
      });
  }

  // 에러는 400 코드의 JSON 형태로 프론트에 전달됨
  // res.status(400).json({ status: 400, result: 'error', reason: error.message });

  res
    .status(error.status)
    .json({ result: 'error', reason: error.message, statusCode: error.status });
}

export { errorHandler };
