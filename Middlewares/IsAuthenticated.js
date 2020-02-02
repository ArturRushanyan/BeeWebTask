import User from '../models/User';
import * as Token from '../Helpers/GenerateToken';
import Error from '../Helpers/Errors';

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== undefined && token !== null) {
        Token.verifyToken(res, token)
            .then(user => User.findOne({ email: user.email }))
            .then((existUser) => {
                if (existUser) {
                    next();
                }
            }).catch(err => {
            return Error.errorHandling(res, 400, err || 'Can not find user');
        });
    } else {
        return Error.errorHandling(res, 403, 'Failed to authenticate token');
    }
};

export default isAuthenticated;
