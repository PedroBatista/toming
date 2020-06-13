
const {Session} = require("../database/models");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');


const isValidSession = catchAsync(async (req,res,next)  => {
  console.log("checking session.. " + req.session)

  var sess = await Session.findById(req.cookies.sessionid).exec().then(sess => {

      if (sess == null) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "");
      }

    }
  );

  next();

})




module.exports = isValidSession;
