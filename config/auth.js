// config/auth.js

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'ログインが必要です');
    res.redirect('/auth/signin');
  }
};
