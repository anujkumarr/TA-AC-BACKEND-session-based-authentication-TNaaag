var express = require('express');
var router = express.Router();

var Blog = require('../models/Blog');
var Comment = require('../models/Comment');

// Comments

router.get('/:id/delete', function (req, res, next) {
  var cid = req.params.id;
  Comment.findByIdAndRemove(cid, (err, comment) => {
    if (err) return next(err);
    Blog.findByIdAndUpdate(
      comment.blogId,
      { $pull: { comments: comment._id } },
      (err, blog) => {
        if (err) return next(err);
        res.redirect('/blogs/' + comment.blogId);
      }
    );
  });
});

router.get('/:id/edit', function (req, res, next) {
  var cid = req.params.id;
  Comment.findById(cid, (err, comment) => {
    if (err) return next(err);
    res.render('editComment', { comment });
  });
});

router.post('/:id', function (req, res, next) {
  var cid = req.params.id;
  var data = req.body;
  Comment.findByIdAndUpdate(cid, data, (err, comment) => {
    if (err) return next(err);
    res.redirect('/blogs/' + comment.blogId);
  });
});

module.exports = router;
