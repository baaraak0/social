exports.emailValidation = function(email) {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

exports.passwordValidation = function(password) {
	const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{1,15}$/;
	return regex.test(password);
}