// tmp-test.js
require('dotenv').config();     // .env を読み込む
const knex = require('./knex');

knex.raw('SELECT 1+1 AS result')
  .then(res => {
    console.dir(res, { depth: null });  // ここで結果オブジェクト全体を表示
  })
  .catch(err => {
    console.error('接続エラー:', err);
  })
  .finally(() => {
    return knex.destroy();
  });
