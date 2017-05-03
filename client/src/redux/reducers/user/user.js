import initialState from './userInitialState.js';
import {deepClone} from '../../../services/Utills.js';
/* eslint-disable */
const global = (state = initialState, action) => {
    let _state = deepClone(state);

    switch (action.type) {

        case 'LOGIN_USER':
            _state['isConnected'] = true
            _state['userData'] = action.data.user
            _state['token'] = action.data.user.token
            return _state;

        case 'LOGIN_FAILED':
            _state['isConnected'] = false
            _state['userData'] = {}
            _state['token'] = null
            _state['loggingAttempt'] = _state['loggingAttempt'] + 1
            return _state;

        case 'LOG_OUT':
            _state['isConnected'] = false
            _state['userData'] = {}
            _state['token'] = null
            return _state;

        case 'NO_USER_FOUND':
            _state['token'] = null
            return _state;

        case 'CREATE_POST':
            _state['viewPostData'] = action.data.post
            return _state;

        case 'REDIRECT_POST_VIEW':
            _state['viewPostData'] = action.data.data
            return _state;

        case 'REGISTER_ACCOUNT':
            if (action.data.errors !== undefined) {
                _state['registrationError'] = action.data.errors
            } else {
                _state['isConnected'] = true
                _state['userData'] = action.data.user
                _state['token'] = action.data.user.token
            }
            return _state;


        default:
            return state;

    }
};

export default global;
