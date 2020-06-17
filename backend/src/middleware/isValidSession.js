const {Session} = require("../database/models");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const isValidSession = catchAsync(async (req, res, next) => {
  console.log("checking session...")

  const sess = await Session.findById(req.cookies.sessionid).populate("user", ["name"]).exec();
  if (sess == null) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User session is invalid!");
  }

  // Save session on request.
  req.session = sess;

  next();
})

module.exports = isValidSession;
