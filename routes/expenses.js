const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', async function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (!isAuth) return res.redirect('/signin');
  const userId = req.user.id;
  const expenses = await knex('expenses').where({ user_id: userId }).orderBy('date', 'desc');
  res.render('expenses', { title: '家計簿', isAuth, expenses });
});

router.post('/', async function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (!isAuth) return res.redirect('/signin');
  const userId = req.user.id;
  const { date, category, amount, memo } = req.body;
  if (!date || !category || !amount) {
    const expenses = await knex('expenses').where({ user_id: userId }).orderBy('date', 'desc');
    return res.render('expenses', {
      title: '家計簿',
      isAuth,
      expenses,
      errorMessage: ['全ての必須項目を入力してください']
    });
  }
  await knex('expenses').insert({ user_id: userId, date, category, amount, memo });
  res.redirect('/expenses');
});

module.exports = router;