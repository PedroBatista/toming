const express = require('express');
const httpStatus = require('http-status');
const {User, Session} = require('../database/models');
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validation');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const router = express.Router();

//AUTHENTICATION:
//https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/src/routes/v1/user.route.js

// https://dev.to/nedsoft/central-error-handling-in-express-3aej
// https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk

router.post('/register',
  validate(authValidation.register),
  catchAsync(async (req, res) => {
      const userBody = req.body;

      if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.CONFLICT, "Email already taken.");
      }

      const user = await User.create(userBody);

      // TODO Auth

      res.status(httpStatus.CREATED).send(user);
    }
  )
);

router.post('/login',
  validate(authValidation.login),
  catchAsync(async (req, res) => {
      const {email, password} = req.body;

      const user = await User.findOne({email});
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password.");
      }

      // TODO Auth
      user.password = "";
      var sess = new Session();
      sess.user = user;
      //save it in the DB
      await sess.save()
        .then(sess => {
          //send a 201 and the new resource
          let options = {
            maxAge: 1000 * 60 * 1440, // would expire after 24 hours
            httpOnly: true, // The cookie only accessible by the web server
          }
          // Set cookie
          res.cookie('sessionid', sess._id, options) // options is optional


          res.status(201).json(sess)
        })
        .catch(err => {
          let errStatus = err.name === 'ValidationError' ? 400 : 500
          throw new ApiError(errStatus, err);
        })

      //return res.send({ user });
    }
  )
);


router.get('/session',
  catchAsync(async (req, res) => {

    var sess = await Session.findById(req.cookies.sessionid).exec();
    console.log("Sess: " + sess)

    if(sess != null){
      return res.status(200).json(sess)
    }

    throw new ApiError(httpStatus.UNAUTHORIZED, "");
    }
  )
);

module.exports = router;
