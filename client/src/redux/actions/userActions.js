import userModel from '../../bridge/userModel';


export const userLogging = (data) => ({
	type: 'LOGIN_USER',
	data
});

export const userLoggingFailed = (data) => ({
	type: 'LOGIN_FAILED',
	data
});

export const setCoords = (data) => ({
	type: 'SET_COORDS',
	data
});

export const registerAccount = (data) => ({
	type: 'REGISTER_ACCOUNT',
	data
});

export const noUserFound = () => ({
	type: 'NO_USER_FOUND'
});

export const logOutUser = () => ({
	type: 'LOG_OUT'
});

export const createPostSuccess = (data) => ({
	type: 'CREATE_POST',
	data
});

export const redirectToPostView = (data) => ({
	type: 'REDIRECT_POST_VIEW',
	data
});

// Get account balance - MyAccount page
export function verifiedUser(userData) {
	return dispatch => {
		userModel.Login(userData)
			.then((data) => {
				try {
					dispatch(userLogging(data));
				}
				catch (error) {
					dispatch(userLoggingFailed(data));
				}
			});
	};
}

// Get account balance - MyAccount page
export function registrationAccount(accountDetails) {
	return dispatch => {
		userModel.registerAccount(accountDetails)
			.then((data) => {
				try {
					dispatch(registerAccount(data))
				}
				catch (error) {
					dispatch(registerAccount(data))
				}
			});
	};
}


// Get account balance - MyAccount page
export function getUserByTokenAction() {
	return dispatch => {
		userModel.getUserByToken()
			.then((data) => {
				try {
					dispatch(userLogging(data));
				}
				catch (error) {
					dispatch(noUserFound());
				}
			});
	};
}

// Get account balance - MyAccount page
export function createPost(post) {
	return dispatch => {
		userModel.sendCreatePost(post)
			.then((data) => {
				try {
					dispatch(createPostSuccess(data));
				}
				catch (error) {
					console.log('in error' + error)
				}
			});
	};
}


// Get account balance - MyAccount page
export function renderApp() {
	return dispatch => {
		dispatch(noUserFound());
	};
}

// Get account balance - MyAccount page
export function logOut() {
	return dispatch => {
		dispatch(logOutUser());
	};
}


// Get account balance - MyAccount page
export function pushPostData(data) {
	return dispatch => {
		dispatch(redirectToPostView(data))
	}
}

export function getPostBySlug(slug) {
	return dispatch => {
		userModel.getPostBySlugName(slug)
			.then((data) => {
				try {
					dispatch(createPostSuccess(data));
				}
				catch (error) {
					console.log(error)
				}
			});
	};
}

export function setCoordsToStore(coords) {
	return dispatch => {
		dispatch(setCoords(coords))
	};
}

export function setUserLocation(coords) {
	return dispatch => {
		userModel.sendUserLocation(coords)
			.then((data) => {
				try {
					console.log('send user location to server')
				}
				catch (error) {
					console.log(error)
				}
			});
	};
}