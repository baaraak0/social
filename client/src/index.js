import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux/reducers/configureStore.js';

import globalInitialState from './redux/reducers/global/globalInitialState.js';
import userInitialState from './redux/reducers/user/userInitialState.js';

import './styles/styles.scss';

import App from './containers/App';
import Main from './containers/Main';
import Login from './containers/Login';
import Register from './containers/Register';
import Upload from './containers/Upload';
import ViewPost from './containers/ViewPost';
import Logout from './containers/Logout.js';
import Nomatch from './containers/Nomatch';


function getInitialState() {
  const _initState = {
    global: globalInitialState,
    user: userInitialState
  };
  return _initState;
}

const store = configureStore(getInitialState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/upload' component={Upload} />
        <Route path='/logout' component={Logout} />
        <Route path='/view/:slug' component={ViewPost} />
        <Route path='*' component={Nomatch} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));