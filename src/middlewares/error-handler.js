import 'module-alias/register';
import {errorCode} from "@error";

// 에러 미들웨어는 항상 (설령 안 쓰더라도)
// error~next의 4개 인자를 설정해 주어야 함.
function errorHandler(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);
  console.log('error.code : ',error.code);
  console.log('error.message : ', error.message);
  // console.log('error: ', error);
    // 에러는 400 코드의 JSON 형태로 프론트에 전달됨
  console.log(Object.keys(errorCode));
  console.log('errorCode.headerRequested : ', errorCode.headerRequested);


  switch (Object.keys(errorCode)){
    
    case headerRequested : 
    console.log('error.code in switch : ',error.code);
      res.status(400).json({result : "error", reason :"Please check the content type in headers"})
      break;
  }
  // res.status(400).json({ result: 'error', reason: error.message });

  
}

export { errorHandler };
