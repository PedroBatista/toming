const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const handleError = (err, res) => {
  if (err instanceof ApiError) {
    const {statusCode, message} = err;
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  }
  else {
    console.log(err.stack);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "error",
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message
    });
  }
};

module.exports = handleError;
