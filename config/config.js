require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: "root",
    password: null,
    database: "atter_test",
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};