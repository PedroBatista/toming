const Joi = require('@hapi/joi');
const {objectId} = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    options: Joi.array().min(1).items(Joi.object().keys({
      option: Joi.string().required()
    })).required()
  })
};

const get = {
  params: Joi.object().keys({
    question: Joi.string().required().custom(objectId),
  })
}

module.exports = {
  create,
  get
};
