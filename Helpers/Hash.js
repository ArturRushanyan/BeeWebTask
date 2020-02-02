import bcrypt from 'bcrypt';

exports.hashing = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return reject(err);
            }
            return resolve(hash);
        });
    });
};

exports.compare = (password, userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })

    })
};
