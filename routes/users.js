const knex = require('../knex');

exports.findById = async function(id) {
  const users = await knex('users').where({ id: id });
  if (users.length === 0) throw new Error('User not found');
  return users[0];
};

exports.findByName = async function(name) {
  const users = await knex('users').where({ name: name });
  if (users.length === 0) throw new Error('User not found');
  return users[0];
};