const Joi = require('@hapi/joi');
const {pick} = require('lodash');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const {value, error} = Joi.compile(validSchema)
    .prefs({errors: {label: 'key'}})
    .validate(object, {abortEarly: false});

  if (error) {
    const errorMessage = error.details.map(d => d.message).join(', ');
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMessage);
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
