var router = require('express').Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload post objects on routes with ':post'
router.param('post', function (req, res, next, slug) {
	Post.findOne({slug: slug})
		.populate('author')
		.then(function (post) {
			if (!post) {
				return res.sendStatus(404);
			}

			req.post = post;

			return next();
		}).catch(next);
});

/* GET :: /api/post - Get all posts */
router.get('/', auth.optional, function (req, res, next) {
	return Promise.all([
		Post.find({})
			.sort({createdAt: 'desc'})
			.populate('author')
			.exec(),
		Post.count({}).exec(),
		req.payload ? User.findById(req.payload.id) : null,
	]).then(function (results) {
		var posts = results[0];
		var postsCount = results[1];
		var user = results[2];

		return res.json({
			posts: posts.map(function (post) {
				return post.toJSONFor(user);
			}),
			postsCount: postsCount
		});
	}).catch(next);
});

/* POST :: /api/post - Create new post */
router.post('/', auth.required, function (req, res, next) {
	User.findById(req.payload.id).then(function (user) {
		if (!user) {
			return res.sendStatus(401);
		}

		var post = new Post({
			title: req.body.title,
			description: req.body.description,
			body: req.body.body,
		});

		post.author = user;

		return post.save().then(function () {
			return res.json({post: post.toJSONFor(user)});
		});
	}).catch(next);
});

/* GET :: /api/:postSlug - Get post by slug */
router.get('/:post', auth.optional, function (req, res, next) {
	Promise.all([
		req.payload ? User.findById(req.payload.id) : null,
		req.post.populate('author').execPopulate()
	]).then(function (results) {
		var user = results[0];

		return res.json({post: req.post.toJSONFor(user)});
	}).catch(next);
});


module.exports = router;
