const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex          = require('../knex');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await knex('users').where({ name: username }).first();
      if (!user) return done(null, false, { message: 'ユーザーが存在しません' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok)    return done(null, false, { message: 'パスワードが間違っています' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex('users').where({ id }).first();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/signin');
}

module.exports = {
  ensureAuthenticated
};
