import Joi from '@hapi/joi';

module.exports = {
    Login: Joi.object({
        email: Joi.string().email().required().min(3)
            .max(20),
        password: Joi.string().min(6).max(12),
    }),
    Register: Joi.object().keys({
        email: Joi.string().email().required().min(3)
            .max(20),
        password: Joi.string().min(6).max(12),
    }),
};
