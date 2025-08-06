const path      = require('path')
const express   = require('express')
const session   = require('express-session')
const flash     = require('connect-flash')
const passport  = require('passport')
require('./config/passport')    // ← 事前に用意した passport 設定

const app = express()

// view エンジン
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 静的ファイル読み込み
app.use(express.static(path.join(__dirname, 'public')))

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// セッション設定
app.use(session({
  secret: 'YOUR_SECRET_KEY',  
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// 全ビューで共通利用できるオブジェクト
app.use((req, res, next) => {
  res.locals.isAuth       = req.isAuthenticated()
  res.locals.user         = req.user
  res.locals.errorMessages = req.flash('error')
  next()
})

// ルーティング
app.use('/',       require('./routes/index'))
app.use('/auth',   require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/expenses', require('./routes/expenses'))

// エラーハンドラ
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).render('error', { message: err.message, error: {} })
})

module.exports = app
