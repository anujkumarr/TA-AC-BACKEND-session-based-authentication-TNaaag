var express = require('express');
var router = express.Router();
var User = require('../model/User');
var bcrypt = require('bcrypt');

/* GET users listing. */

router.get('/', (req, res, next) => {
  res.render('registerUser')
})

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    console.log(err, user)
    if (err) return next(err);
    res.redirect('/users')
  })
});
 


module.exports = router;
