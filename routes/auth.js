const express  = require('express')
const router   = express.Router()
const passport = require('passport')
const knex     = require('../knex')
const bcrypt   = require('bcrypt')

// GET /auth?mode=signin or ?mode=signup
router.get('/', (req, res) => {
  const mode = req.query.mode === 'signup' ? 'signup' : 'signin'
  res.render('auth', { title: mode === 'signin' ? 'ログイン' : '新規登録', mode })
})

// POST /auth/signin
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth?mode=signin',
    failureFlash: true
  })(req, res, next)
})

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  const { username, password, repassword } = req.body

  try {
    // ユーザ名重複チェック
    const exists = await knex('users').where({ name: username }).first()
    if (exists) {
      req.flash('error', 'このユーザ名は既に使われています')
      return res.redirect('/auth?mode=signup')
    }

    // パスワード一致チェック
    if (password !== repassword) {
      req.flash('error', 'パスワードが一致しません')
      return res.redirect('/auth?mode=signup')
    }

    // ハッシュ化して登録
    const hash = await bcrypt.hash(password, 10)
    const [newId] = await knex('users').insert({ name: username, password: hash })

    // 自動ログイン
    const user = await knex('users').where({ id: newId }).first()
    req.login(user, err => {
      if (err) return next(err)
      res.redirect('/')
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
