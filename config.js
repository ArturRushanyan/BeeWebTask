const config = {
    port: 3000,
    Db: {
        url: 'mongodb://localhost:27017/testBeeWeb',
    },
    JWT_KEY: 'superSecret',
};

module.exports = config;
