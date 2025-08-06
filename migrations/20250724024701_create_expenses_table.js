// └─ migrations/20250724024701_create_expenses_table.js

exports.up = function(knex) {
  return knex.schema.hasTable('expenses').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('expenses', function(table) {
        table.increments('id').primary();      // ID（自動採番）
        table.date('date');                    // 日付
        table.string('category');              // カテゴリ
        table.integer('amount');               // 金額
        table.text('memo');                    // メモ
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('expenses');
};
