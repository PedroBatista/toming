
const {Session} = require("../database/models");

const isValidSession = (req,res,next) =>{
console.log("checking session.. " + req.session)

  //Session.findById()

  next();
}



module.exports = isValidSession;
