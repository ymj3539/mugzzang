<<<<<<< HEAD
import "dotenv/config";
import { app } from "./src/app";
=======
import 'dotenv/config';
import { app } from './src/app.js';
>>>>>>> c889f4f8fbcbebb0902e82d278f198fd7f9acd1f

// .env 파일에 예를 들어 PORT="3000" 을 작성하면, process.env.PORT가 3000이 됨
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
