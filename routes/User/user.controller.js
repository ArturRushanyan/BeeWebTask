import User from '../../Models/User';
import Error from '../../Helpers/Errors';
import * as Hash from '../../Helpers/Hash';
import * as AuthWithJoi from '../../Helpers/Joi_Verify';
import * as Token from  '../../Helpers/GenerateToken';


exports.login = (req, res) => {
    let currentUser = {};
    if( !AuthWithJoi.Login(req) ) {
        return Error.errorHandling(res, 400, 'Auth Failed');
    }
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (!user) {
            return Error.errorHandling(res, 401, 'Auth Failed');
        }
        currentUser = user;
        return Hash.compare(req.body.password, user.password);
    }).then((result) => {
        if (!result) {
            return Error.errorHandling(res, 403, 'Password does not match');
        }
        Token.generateToken(res, req.body.email)
            .then(resGenToken => {
                return res.status(200).json({
                    token: resGenToken,
                    message: 'Auth successful',
                });
            });
    }).catch((err) => {
        return Error.errorHandling(res, 500, err);
    });
};


exports.register = (req, res) => {
    if (!AuthWithJoi.Registration(req)) {
        return Error.errorHandling(res, 500, 'Password does not match');
    }
    User.find({
        email: req.body.email,
    }).then((user) => {
        if (user.length > 0) {
            return Error.errorHandling(res, 409, 'Mail exists');
        }
        return Hash.hashing(req.body.password);
    }).then((hashedPassword) => {
        const newUser = new User({
            // _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
        });
        return newUser.save();
    }).then((result) => {
        Token.generateToken(res, result.email)
            .then(resGenToken => {
                res.status(200).json({
                    message: 'Registration successfully',
                    token: resGenToken,
                });
            });
    }).catch((err) => {
        return Error.errorHandling(res, 500, err);
    });
};
