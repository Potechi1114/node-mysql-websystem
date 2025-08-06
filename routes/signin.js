const express = require('express');
const router = express.Router();
const passport = require('passport');

// サインインページの表示
router.get('/', (req, res) => {
  res.render('signin', { title: 'Sign In', message: req.flash('error') });
});

// ログイン処理
router.post('/', passport.authenticate('local', {
  successRedirect: '/expenses',   // ログイン成功時のリダイレクト先
  failureRedirect: '/signin',     // ログイン失敗時のリダイレクト先
  failureFlash: true              // エラーメッセージ表示
}));

module.exports = router;
