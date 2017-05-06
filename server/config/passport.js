var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function (email, password, done) {
	User.findOne({email: email}).then(function (user) {
		if (user && user.comparePassword(password)) {
			return done(null, user);
		}
		return done(null, false, {errors: {login: 'No user found'}});

	}).catch(done);
}));

