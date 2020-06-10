const express = require('express');
const httpStatus = require('http-status');
const {User} = require('../database/models');
const validate = require('../middleware/validate');
const authValidation = require('../validations/auth.validation');

let SessionModel = require("../database/models/session")
const router = express.Router();

// https://mannhowie.com/express-validation
// https://dev.to/nedsoft/central-error-handling-in-express-3aej
// https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk

router.post('/register',
  validate(authValidation.register),
  async (req, res) => {
    const userBody = req.body;

    if (await User.isEmailTaken(userBody.email)) {
      return res.status(httpStatus.CONFLICT).json({error: "Email already taken."});
    }

    const user = await User.create(userBody);

    // TODO Auth

    res.status(httpStatus.CREATED).send(user);
  }
);

router.post('/login',
  validate(authValidation.login),
  async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.send(httpStatus.UNAUTHORIZED).json({error: "Incorrect email or password."});
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

        res.status(201).json({data: sess})
      })
      .catch(err => {
        let errStatus = err.name === 'ValidationError' ? 400 : 500
        res.status(errStatus).json({err: err})
      })

    //return res.send({ user });
  }
);

module.exports = router;
