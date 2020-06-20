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
  else if (err.name === "NotFoundError") {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      statusCode: httpStatus.NOT_FOUND,
      message: err.message
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
