const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(255)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(255)
        .required(),
    avatar: Joi.string(),
    description: Joi.string()
        .min(3)
        .max(255)
        .required(),

});

module.exports = schema;
