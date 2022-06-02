import 'module-alias/register';
import { errorCode } from '@error';

// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  switch (error.code) {
    case 400:
      res
        .status(400)
        .json({ status: 400, result: 'error', reason: error.message });
    default:
      res
        .status(500)
        .json({ status: 500, result: 'error', reason: error.message });
  }
}

export { errorHandler };
