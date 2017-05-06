var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var regexTest = require('../../services/regexTest');

/* GET :: /api/user - Get user profile */
router.get('/user', auth.required, function (req, res, next) {

	User.findById(req.payload.id).then(function (user) {
		if (!user) {
			return res.sendStatus(401);
		}

		return res.json({user: user.toAuthJSON()});
	}).catch(next);
});

/* PUT :: /api/user - Update user profile */
router.put('/user', auth.required, function (req, res, next) {
	User.findById(req.payload.id).then(function (user) {
		if (!user) {
			return res.sendStatus(401);
		}

		// only update fields that were actually passed...
		if (typeof req.body.user.username !== 'undefined') {
			user.username = req.body.user.username;
		}
		if (typeof req.body.user.email !== 'undefined') {
			user.email = req.body.user.email;
		}
		if (typeof req.body.user.bio !== 'undefined') {
			user.bio = req.body.user.bio;
		}
		if (typeof req.body.user.image !== 'undefined') {
			user.image = req.body.user.image;
		}
		if (typeof req.body.user.password !== 'undefined') {
			user.updatePassword(req.body.user.password);
		}

		return user.save().then(function () {
			return res.json({user: user.toAuthJSON()});
		});
	}).catch(next);
});

/* POST :: /api/users/login - Login user */
router.post('/users/login', function (req, res, next) {
	// if (!regexTest.emailValidation(req.body.email)) {
	// 	return res.json({errors: {email: "email validation error"}});
	// }
	//
	// if (!regexTest.passwordValidation(req.body.password)) {
	// 	return res.json({errors: {password: "password validation error"}});
	// }

	passport.authenticate('local', {session: false}, function (err, user, info) {
		if (err) {
			return next(err);
		}

		if (user) {
			return res.json({user: user.toAuthJSON()});
		} else {
			return res.json(info);
		}
	})(req, res, next);
});

/* POST :: /api/users - Register new user */
router.post('/users', function (req, res, next) {
	var user = new User();

	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;

	user.save().then(function () {
		return res.json({user: user.toAuthJSON()});
	}).catch(next);
});

router.post('/users/setCoords', auth.required, function (req, res, next) {
	User.findById(req.payload.id).then(function (user) {
		if (!user) {
			return res.sendStatus(401);
		}

		if (typeof req.body.latitude !== 'undefined' && typeof req.body.longitude !== 'undefined') {
			user.location = {
				latitude: req.body.latitude,
				longitude: req.body.longitude
			};
		}

		return user.save().then(function () {
			return res.json({user: user.toAuthJSON()});
		});
	}).catch(next);
});

module.exports = router;
