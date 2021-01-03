const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: 'seniya2.iptime.org',
    port: '3307',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: 'seniya2.iptime.org',
    port: '3307',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: 'seniya2.iptime.org',
    port: '3307',
    dialect: 'mysql',
  },
};