const path      = require('path');
const express   = require('express');
const session   = require('express-session');
const flash     = require('connect-flash');
const passport  = require('passport');
require('./config/passport'); // Passport設定

const app = express();

// view エンジン
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静的ファイル読み込み
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// セッション設定（flashより前）
app.use(session({
  secret: 'aaa',
  resave: false,
  saveUninitialized: false
}));

// flashメッセージの使用
app.use(flash());

// Passportの初期化
app.use(passport.initialize());
app.use(passport.session());

// 全ビューで共通利用できるオブジェクト
app.use((req, res, next) => {
  res.locals.isAuth        = req.isAuthenticated();
  res.locals.user          = req.user;
  res.locals.errorMessages = req.flash('error');
  next();
});

// ルーティング（Passport初期化後に設定）
app.use('/',         require('./routes/index'));
app.use('/auth',     require('./routes/auth'));
app.use('/signin',   require('./routes/signin'));
app.use('/signup',   require('./routes/signup'));
app.use('/logout',   require('./routes/logout'));
app.use('/expenses', require('./routes/expenses'));

// エラーハンドラ
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { message: err.message, error: {} });
});

module.exports = app;
