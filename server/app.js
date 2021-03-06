var methods = require('methods'),
	express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	errorhandler = require('errorhandler'),
	config = require('./config'),
	mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());

if (isProduction) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	app.use(errorhandler());
	mongoose.connect(config.db.url);
	mongoose.set('debug', config.db.debug);
}

require('./models/User');
require('./models/Post');
require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
	app.use(function (err, req, res, next) {
		console.log(err.stack);

		res.status(err.status || 500);

		res.json({
			'errors': {
				message: err.message,
				error: err
			}
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		'errors': {
			message: err.message,
			error: {}
		}
	});
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || config.port, function () {
	console.log('Listening on port ' + server.address().port);
});
