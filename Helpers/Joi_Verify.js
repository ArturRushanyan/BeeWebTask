import Joi from '@hapi/joi';
import Schema from './Joi_Schema';

exports.Login = (req) => {
    const schemaResult = Schema.Login;
    const result = schemaResult.validate(req.body);
    return !!result;
};

exports.Registration = (req) => {
    const schemaResult = Schema.Register;
    if (req.body.password !== req.body.confirmPassword) {
        return false;
    }
    const result = schemaResult.validate(req.body);
    return !!result;
};
