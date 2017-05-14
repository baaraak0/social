import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './redux/reducers/configureStore.js';

import globalInitialState from './redux/reducers/global/globalInitialState.js';
import userInitialState from './redux/reducers/user/userInitialState.js';

import App from './containers/App';
import Main from './modules/localFeed/Main';
import Login from './modules/login/Login';
import Register from './modules/registration/Register';
import Upload from './modules/post/createPost/Upload';
import ViewPost from './modules/post/viewPost/ViewPost';
import Nomatch from './modules/noMatchPage/Nomatch';

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
        <Route path='/view/:slug' component={ViewPost} />
        <Route path='*' component={Nomatch} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));