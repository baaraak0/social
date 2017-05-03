var router = require('express').Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

// return a list of tags
router.get('/', function(req, res, next) {
  Post.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
