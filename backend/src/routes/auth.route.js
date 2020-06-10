const express = require('express');
const httpStatus = require('http-status');
const {User} = require('../database/models')
const authValidation = require('../validations/auth.validation');

let SessionModel = require("../database/models/session")
const router = express.Router();

// https://mannhowie.com/express-validation
// https://dev.to/nedsoft/central-error-handling-in-express-3aej

router.post('/register',
  async (req, res, next) => {
    const userBody = req.body;

    const {error, value} = authValidation.register.validate(userBody, {abortEarly: false});

    if (error) {
      const response = {
        success: false,
        message: "Invalid input data.",
        details: error.details
      }
      return res.send(httpStatus.BAD_REQUEST, response);
    }

    if (await User.isEmailTaken(userBody.email)) {
      const response = {
        success: false,
        message: "Email already taken."
      }
      return res.send(httpStatus.BAD_REQUEST, response);
    }

    return next();
  },
  async (req, res) => {
    const userBody = req.body;

    const user = await User.create(userBody);

    // TODO Auth

    res.status(httpStatus.CREATED).send(user);
  }
);


router.post('/login', async (req, res, next) => {
    const userBody = req.body;

    const {error, value} = authValidation.login.validate(userBody, {abortEarly: false});

    if (error) {
      const response = {
        success: false,
        message: "Invalid input data.",
        details: error.details
      }
      return res.send(httpStatus.BAD_REQUEST, response);
    }

    return next();
  },
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      const response = {
        success: false,
        message: "Incorrect email or password."
      }
      return res.send(httpStatus.UNAUTHORIZED, response);
    }

    // TODO Auth
    user.password = "";
    var sess = new SessionModel();
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

        res.status(201).json({ data: sess })
      })
      .catch(err => {
        let errStatus = err.name === 'ValidationError' ? 400 : 500
        res.status(errStatus).json({err: err})
      })

    //return res.send({ user });
  }
);

module.exports = router;
