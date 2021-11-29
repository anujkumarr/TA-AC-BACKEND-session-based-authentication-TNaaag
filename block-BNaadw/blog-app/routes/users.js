var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function (req, res, next) {
  console.log(req.sessions);
  res.render('dashboard');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res, next) {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
});

router.get('/login', function (req, res, next) {
  var error = req.flash('error');
  res.render('login', { error });
});

router.post('/login', function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email or Password is missing..');
    return res.redirect('/users/login');
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', 'Email Does not exist..');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'Password is wrong...');
        return res.redirect('/users/login');
      }
      // Persist Logged In User Information
      req.session.userId = user._id;
      res.redirect('/blogs');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
