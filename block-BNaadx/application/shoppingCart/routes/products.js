var express = require('express');
var User = require('../models/User');
var Product = require("../models/Product");
var router = express.Router();

router.get('/', function (req, res, next) {
  var id = req.session.userId;
  User.findById(id, (err, user) => {

    if (err) return next(err);
    if (user.isAdmin === 'true') {
      return res.render('productsAdmin', { user });
    } else if (user.isAdmin === 'false') {
      return res.render('productsUser', { user });
    }
  });
});

router.get('/add', (req, res, next) => {
  var id = req.session.userId;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    if (user.isAdmin === 'true') {
      return res.render('addProduct', { user });
    }
  });
});

router.post('/', (req, res, next) => {
  Product.create(req.body, (err, createdProduct) => {
    if (err) return next(err);
    res.redirect('/products/add');
  });
});


module.exports = router;
