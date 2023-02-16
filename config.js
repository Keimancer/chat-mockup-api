//* Imports
require('dotenv').config();

//* Full configs
const config = {
    api: {
        port: process.env.PORT || 9001,
        host: process.env.HOST || 'http://localhost:9001',
        nodeEnv: process.env.NODE_ENV || 'development'
    },
    db: {
        development: {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASS,
            database: 'chat-db',
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll: true
            }
        },
        production: {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASS,
            database: 'chat-db',
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll: true
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        },
        testing: {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASS,
            database: 'chat-db',
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll: true
            }
        }
    }
};

//* Export
module.exports = config;