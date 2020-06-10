const Joi = require('@hapi/joi');
const {password} = require('./custom.validation');

const register = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
});

const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  login
};
