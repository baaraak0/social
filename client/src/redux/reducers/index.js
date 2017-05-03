import {combineReducers} from 'redux';
import global from './global/global.js';
import user from './user/user.js';

const application = combineReducers({
    global,
    user
});

export default application;
