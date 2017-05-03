import initialState from './globalInitialState.js';
import { deepClone } from '../../../services/Utills.js';

const global = (state = initialState, action) => {
    let _state = deepClone(state);

    switch (action.type) {

        case 'SET_ITEMS':
            _state['itemsData'] = action.data.posts
            return _state;

		case 'LOGIN_USER':
			_state['isAppReady'] = true
			return _state;

		case 'NO_USER_FOUND':
			_state['isAppReady'] = true
			return _state;

        default:
            return state;

    }
};

export default global;
