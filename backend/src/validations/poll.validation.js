const Joi = require('@hapi/joi');

const create = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    questions: Joi.array().min(1).items(Joi.object().keys({
      question: Joi.string().required()
    })).required()
  })
};

module.exports = {
  create
};
