const express = require('express');
const router = express.Router();
const knex = require("../knex");
const bcrypt = require("bcrypt");

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  res.render("signin", {
    title: "Sign in",
    isAuth: isAuth,
  });
});

router.post('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const username = req.body.username;
  const password = req.body.password;

  knex("users")
    .where({
      name: username,
    })
  .select("*")
  .then(async function (results) {
    const comparedPassword = await bcrypt.compare(password, results[0].password);
    console.log(comparedPassword);
    if (results.length === 0) {
      res.render("signin", {
        title: "Sign in",
        errorMessage: ["ユーザが見つかりません"],
        isAuth: isAuth,
      });
    } 
    else {
      req.session.userid = results[0].id;
      res.redirect('/');
    }
  })
    .catch(function (err) {
      console.error(err);
      res.render("signin", {
        title: "Sign in",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

module.exports = router;