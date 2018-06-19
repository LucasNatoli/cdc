var config = {
    development: {
        url: 'localhost',
        port: 3000,
        sms: {
            apodo: 'factora2379'
        },
        database: {
            host: 'localhost'.
            port: 3306,
            dialect: 'mysql',
            db: 'cdc',
            username: 'root',
            password: 'Kalama2018'
        }
    },
    test: {
        url: 'localhost',
        port: 8080,
        sms: {
            apodo: 'factora2379'
        },
        database: {
            host: 'localhost'.
            port: 3306,
            dialect: 'mysql',
            db: 'cdc',
            username: 'test',
            password: 'test'
        }
    },
    production: {
        url: 'localhost',
        port: 80,
        sms: {
            apodo: 'factora2379'
        },
        database: {
            host: 'localhost'.
            port: 3306,
            dialect: 'mysql',
            db: 'cdc',
            username: 'web',
            password: 'web'
        }
    }
};
module.exports = config;
