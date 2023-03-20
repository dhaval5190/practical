require("dotenv").config();
let Comman = {};
Comman.setResponse = (res, code, flag, message, data = {}) => {
  let statusCode = code;
  let responseStatus = flag;
  let responseMessage = message;
  let responseData = data;
  res.status(statusCode).json({
    code: statusCode,
    success: responseStatus,
    message: responseMessage,
    data: responseData,
  });
};
module.exports = Comman;
