const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),
    description: Joi.string()
        .min(30)
        .max(500)
        .required(),
    cover: Joi.string(),
    author_id: Joi.number()
        .required(),
    category_id: Joi.number()
        .required()
});

module.exports = schema;
