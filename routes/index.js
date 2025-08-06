const express = require('express')
const router  = express.Router()

// ルートに来たら未認証時は /auth?mode=signin へリダイレクト
// 認証済みはメイン画面を表示
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth?mode=signin')
  }
  res.render('index', { title: 'メイン画面' })
})

module.exports = router
