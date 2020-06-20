const Joi = require('@hapi/joi');

const create = {
  body: Joi.object().keys({
    option: Joi.string().required(),
    options: Joi.array().min(1).items(Joi.object().keys({
      option: Joi.string().required()
    })).required()
  })
};

module.exports = {
  create
};
