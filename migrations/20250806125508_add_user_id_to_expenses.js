// migrations/20250806220000_add_user_id_to_expenses.js

exports.up = function(knex) {
  return knex.schema.alterTable('expenses', table => {
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('expenses', table => {
    table.dropColumn('user_id');
  });
};
