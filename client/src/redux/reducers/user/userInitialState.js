const globalInitialState = {
    isConnected: false,
    userData: {},
    token: null,
	loggingAttempt: 0,
	registrationError: null,
	viewPostData: {},
	userCoords: {
		latitude: null,
		longitude: null
	}
};

export default globalInitialState;