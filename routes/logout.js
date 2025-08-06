const express = require('express')
const router  = express.Router()

router.get('/', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)

    req.session.destroy(err => {
      if (err) console.error('Session destroy error:', err)
      res.clearCookie('connect.sid', { path: '/' })
      // ログアウト後に選択画面を表示
      res.render('logout', { title: 'ログアウトしました' })
    })
  })
})

module.exports = router
