var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');
var secret = require('../config').secret;

var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		index: true
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
		index: true
	},
	password: {
		type: String,
		required: true
	},
	bio: String,
	image: String,
	location: {}
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.updatePassword = function (password) {
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			this.password = hash;
		});
	});
};


UserSchema.pre('save', function (next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, secret);
};

UserSchema.methods.toAuthJSON = function () {
	return {
		id: this._id,
		username: this.username,
		email: this.email,
		location: this.location,
		image: this.image,
		token: this.generateJWT()
	};
};

UserSchema.methods.toProfileJSONFor = function (user) {
	return {
		id: this._id,
		username: this.username,
		image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
	};
};

mongoose.model('User', UserSchema);
