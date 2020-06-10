const Joi = require('@hapi/joi');
const {pick} = require('lodash');
const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const {value, error} = Joi.compile(validSchema)
    .prefs({errors: {label: 'key'}})
    .validate(object, {abortEarly: false});

  if (error) {
    const errorMessage = error.details.map(d => d.message).join(', ');
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({error: errorMessage});
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
