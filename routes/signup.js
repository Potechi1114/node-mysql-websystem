const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render('signup', {
    title: 'Sign up'
  })
})

router.post('/', async (req, res, next) => {
  const { username, password, repassword } = req.body

  try {
    // 1. 重複チェック
    const exists = await knex('users')
      .where({ name: username })
      .first()

    if (exists) {
      req.flash('error', 'このユーザ名は既に使われています')
      return res.redirect('/signup')
    }

    // 2. パスワード一致チェック
    if (password !== repassword) {
      req.flash('error', 'パスワードが一致しません')
      return res.redirect('/signup')
    }

    // 3. ハッシュ化して挿入
    const hashed = await bcrypt.hash(password, 10)
    const [newId] = await knex('users').insert({
      name: username,
      password: hashed
    })

    // 4. 自動ログイン
    const user = await knex('users').where({ id: newId }).first()
    req.login(user, (err) => {
      if (err) return next(err)
      res.redirect('/')
    })

  } catch (err) {
    next(err)
  }
})

module.exports = router
