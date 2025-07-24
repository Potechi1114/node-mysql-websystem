// └─ routes/index.js

var express = require('express');
var router  = express.Router();
var knex    = require('../knex');

/* GET home page – 経費一覧を取得して描画 */
router.get('/', async (req, res, next) => {
  try {
    const expenses = await knex('expenses').select('*');
    res.render('index', { expenses });
  } catch (err) {
    next(err);
  }
});

/* POST /expenses – フォームから経費を挿入し、一覧へリダイレクト */
router.post('/expenses', async (req, res, next) => {
  try {
    const { date, category, amount, memo } = req.body;
    await knex('expenses').insert({ date, category, amount, memo });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
