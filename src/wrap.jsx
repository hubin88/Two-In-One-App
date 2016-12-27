import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './model/reducer';
import App from './app';
import Home from './views/home/home';
import Track from './views/track/track';
import Rule from './views/rule/rule';
import User from './views/user/user';
import Login from './views/sign/login';
import Register from './views/sign/register';
import Reset from './views/sign/reset';
import Pay from './views/check-channel/pay';
import Withdraw from './views/check-channel/withdraw';

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
) : createStore(rootReducer, applyMiddleware(thunkMiddleware));

const history = syncHistoryWithStore(browserHistory, store);

const checkLogin =  (nextState, replace) => {
  alert('定义未登录时的钩子')
  if (0 === 0) {
    replace({ pathname: '/login', search: `?source=${nextState.location.pathname.slice(1)}` })
  }
};

const StoreWrap = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/join" component={Register} />
      <Route path="/password_reset" component={Reset} />
      <Route path="/pay" component={Pay} onEnter={checkLogin} />
      <Route path="/withdraw" component={Withdraw} onEnter={checkLogin} />
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/track" component={Track} onEnter={checkLogin} />
        <Route path="/rule" component={Rule} />
        <Route path="/user" component={User} />
      </Route>
    </Router>
  </Provider>
);

export default StoreWrap;
