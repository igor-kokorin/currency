const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env')
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'currency_development',
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'currency_test',
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'currency_production',
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
}
