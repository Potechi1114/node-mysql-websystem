// knex.js
require('dotenv').config();         // .env の内容を process.env にロード

const env    = process.env.NODE_ENV || 'development';
const config = require('./knexfile.js')[env];
const knex   = require('knex')(config);

module.exports = knex;              // 他のファイルで利用できるようエクスポート
