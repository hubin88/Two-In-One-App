import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, IndexRedirect, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './model/reducer';
import App from './app';
import Home from './views/home/home';
import MainBox from './views/main-box';
import Track from './views/user/channel/track';
import Rule from './views/rule/rule';
import User from './views/user/user';
import Broker from './views/broker/broker';
import Single from './views/single-html/single-html';
import NickName from './views/user/channel/nickName';
import Persponal from './views/sign/personal';
import Gold from './views/user/channel/gold';
import Hold from './views/user/channel/hold';
import UserCenter from './views/user/channel/userSet';
import { Cookie } from './ultils/tools';
import LoginWrap from './views/sign-wrap/login-wrap';
import RegisterWrap from './views/sign-wrap/register-wrap';
import ResetWrap from './views/sign-wrap/reset-wrap';
import ResetphoneWrap from './views/sign-wrap/resetphone-wrap';
import ResetPwdWrap from './views/sign-wrap/resetpwd-wrap';

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
) : createStore(rootReducer, applyMiddleware(thunkMiddleware));

const history = syncHistoryWithStore(browserHistory, store);

const checkLogin = (nextState, replace) => {
  const systemType = Cookie.getCookie('systemType');
  const isLogin = Cookie.getCookie(`${systemType}-isLogin`);
  if (!isLogin) {
    replace({ pathname: '/login', search: `?source=${nextState.location.pathname.slice(1)}` });
  }
};

const StoreWrap = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route component={MainBox}>
          <IndexRedirect to="/home" />
          <Route path="/home" component={Home} />
          <Route path="/rule" component={Rule} />
          <Route path="/user" component={User} />
        </Route>
        <Route component={Persponal}>
          <Route path="/login" component={LoginWrap} />
          <Route path="/register" component={RegisterWrap} />
          <Route path="/reset" component={ResetWrap} />
          <Route path="/resetphone" component={ResetphoneWrap} />
          <Route path="/resetpwd" component={ResetPwdWrap} />
        </Route>
        <Route path="/broker" component={Broker} onEnter={checkLogin} />
        <Route path="/pay" component={Single} onEnter={checkLogin} />
        <Route path="/withdraw" component={Single} onEnter={checkLogin} />
        <Route path="/dcbPage" component={Single} />
        <Route path="/dwbPage" component={Single} />
        <Route path="/hold" component={Hold} onEnter={checkLogin} />
        <Route path="/gold" component={Gold} onEnter={checkLogin} />
        <Route path="/userSet" component={UserCenter} onEnter={checkLogin} />
        <Route path="/track" component={Track} onEnter={checkLogin} />
        <Route path="/nickName" component={NickName} onEnter={checkLogin} />
      </Route>
    </Router>
  </Provider>
);

export default StoreWrap;
