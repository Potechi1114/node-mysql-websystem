// routes/expenses.js

const express = require('express');
const router  = express.Router();
const knex    = require('../knex');
const { ensureAuthenticated } = require('../config/passport');

router.use((req, res, next) => ensureAuthenticated(req, res, next));

// 経費一覧表示
router.get('/', async (req, res, next) => {
  try {
    const expenses = await knex('expenses')
      .where({ user_id: req.user.id })
      .orderBy('date', 'desc');

    res.render('expenses', {
      title: '経費一覧',
      expenses
    });
  } catch (err) {
    next(err);
  }
});

// 経費追加
router.post('/', async (req, res, next) => {
  const { date, category, amount, memo } = req.body;

  try {
    await knex('expenses').insert({
      date,
      category,
      amount,
      memo,
      user_id: req.user.id
    });

    res.redirect('/expenses');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
