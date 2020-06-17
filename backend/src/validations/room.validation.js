const Joi = require('@hapi/joi');

const create = {
  body: Joi.object().keys({
    subject: Joi.string().required()
  })
};

module.exports = {
  create
};
