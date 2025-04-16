const Joi = require('joi');

const schema = Joi.object({
    userName: Joi.string()
        .min(3)
        .max(30)
        .when('provider', {
            is: 'local',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*[0-9]).+$/)
        .min(8)
        .max(255)
        .message('Password must contain at least one capital letter and one number, and be between 8 and 255 characters long.')
        .when('provider', {
            is: 'local',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    email: Joi.string()
        .email()
        .when('provider', {
            is: 'local',
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    avatar: Joi.string(),
    books: Joi.object(),
    role: Joi.string().valid('user', 'admin', 'owner').default('user'),
    provider: Joi.string().valid('local', 'google').default('local'),
    code: Joi.number()
});

module.exports = schema;
