const express = require('express');
const router = express.Router();

// ログアウト処理
router.get('/', async (req, res) => {
  try {
    // Passport v0.6以降では logout は非同期関数
    await req.logout();

    // セッションを破棄
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // セッションIDのクッキーも削除
      res.redirect('/signin'); // ログアウト後にサインイン画面へ
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.redirect('/'); // エラー時はトップへ
  }
});

module.exports = router;
