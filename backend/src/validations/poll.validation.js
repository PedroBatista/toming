const Joi = require('@hapi/joi');
const {objectId} = require('./custom.validation');

const create = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    options: Joi.array().min(2).items(Joi.object().keys({
      text: Joi.string().required()
    })).required()
  })
};

const get = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  })
}

const vote = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
    optionId: Joi.string().required().custom(objectId),
  })
}

module.exports = {
  create,
  get,
  vote
};
