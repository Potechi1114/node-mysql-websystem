const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",      // ← ここは自分のMySQLユーザー名に
    password: "password",  // ← パスワードを入力
    database: "kakeibo"           // ← 既存のデータベース名
  }
});

module.exports = knex;
