import JWT from 'jsonwebtoken';
import Config from '../config';
import Error from './Errors'

exports.generateToken = (res, email) => {
    return new Promise((resolve, reject) => {
        if (!email) {
            return reject(Error.errorHandling(res, 400, 'Missing email'));
        }
        resolve(JWT.sign({ email }, Config.JWT_KEY, { expiresIn: '1h' }));
    })
};

exports.verifyToken = (res, token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(Error.errorHandling(res, 400, 'You are not logged in'));
        }
        resolve(JWT.verify(token, Config.JWT_KEY));
    });
};
