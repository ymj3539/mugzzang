class CustomError extends Error {
  constructor(code, msg) {
    super(msg);
    super.code = code;
  }
}

// const errorCode = {
//   headerRequested: 400,
//   // + "Please check the content type in headers",
//   serverConnected: 404,
// };

export { CustomError };
