import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './model/reducer';
import App from './app';
import Home from './views/home/home';
import Track from './views/user/track';
import Rule from './views/rule/rule';
import User from './views/user/user';
import Broker from './views/broker/broker';
import Login from './views/sign/login';
import Register from './views/sign/register';
import Reset from './views/sign/reset';
import Pay from './views/check-channel/pay';
import Withdraw from './views/check-channel/withdraw';
import Gold from './views/check-channel/gold';
import Dcpage from './views/check-channel/dcpage';
import UserCenter from './views/check-channel/dwpage';

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
) : createStore(rootReducer, applyMiddleware(thunkMiddleware));

const history = syncHistoryWithStore(browserHistory, store);

const checkLogin = (nextState, replace) => {
  // alert('定义未登录时的钩子');
  const i = 0;
  if (i !== 0) {
    replace({ pathname: '/login', search: `?source=${nextState.location.pathname.slice(1)}` });
  }
};

const StoreWrap = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/reset" component={Reset} />
      <Route path="/pay" component={Pay} onEnter={checkLogin} />
      <Route path="/withdraw" component={Withdraw} onEnter={checkLogin} />
      <Route path="/hold" component={Dcpage} />
      <Route path="/gold" component={Gold} onEnter={checkLogin} />
      <Route path="/track" component={Track} onEnter={checkLogin} />
      <Route path="/userCenter" component={UserCenter} onEnter={checkLogin} />
      <Route path="/broker" component={Broker} onEnter={checkLogin} />
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/rule" component={Rule} />
        <Route path="/user" component={User} />
      </Route>
    </Router>
  </Provider>
);

export default StoreWrap;
