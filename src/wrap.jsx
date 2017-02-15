import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, IndexRedirect, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './model/reducer';
import App from './app';
import MainBox from './views/main-box';
import Home from './views/home/home';
import Broker from './views/broker/broker';
import User from './views/user/user';
import GoldHtml from './views/single-html/gold-html';
// import SingleHtml from './views/single-html/single-html';
import SignWrap from './views/sign-wrap/sign-wrap';
import UserWrap from './views/user/user-wrap';
import Rule from './views/rule/rule';
import Gold from './views/user/channel/gold';
import Hold from './views/user/channel/hold';
import Track from './views/user/channel/track';
import ModifyName from './views/user/channel/user-set-channel/modify-name';
import UserSet from './views/user/channel/userSet';
import Dcpage from './views/user/channel/dcpage';
import Dwpage from './views/user/channel/dwpage';
import { Cookie } from './ultils/tools';
import LoginWrap from './views/sign-wrap/login-wrap';
import RegisterWrap from './views/sign-wrap/register-wrap';
import ResetPwdWrap from './views/sign-wrap/reset-pwd-wrap';
import ModifyPhoneWrap from './views/user/channel/user-set-channel/modify-phone-wrap';
import ModifyPwdWrap from './views/user/channel/user-set-channel/modify-pwd-wrap';

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
          <Route path="/user" component={User} />
          <Route path="/broker" component={Broker} onEnter={checkLogin} />
        </Route>
        <Route component={SignWrap}>
          <Route path="/login" component={LoginWrap} />
          <Route path="/register" component={RegisterWrap} />
          <Route path="/resetPwd" component={ResetPwdWrap} />
        </Route>

        <Route component={UserWrap}>
          <Route path="/rule" component={Rule} />
          <Route path="/hold" component={Hold} onEnter={checkLogin} />
          <Route path="/gold" component={Gold} onEnter={checkLogin} />
          <Route path="/userSet" component={UserSet} onEnter={checkLogin} />
          <Route path="/track" component={Track} onEnter={checkLogin} />
          <Route path="/dcbPage" component={Dcpage} />
          <Route path="/dwbPage" component={Dwpage} />
        </Route>

        <Route path="/modifyPhone" component={ModifyPhoneWrap} />
        <Route path="/modifyPwd" component={ModifyPwdWrap} />
        <Route path="/modifyName" component={ModifyName} />

        <Route path="/pay" component={GoldHtml} onEnter={checkLogin} />
        <Route path="/withdraw" component={GoldHtml} onEnter={checkLogin} />

      </Route>
    </Router>
  </Provider>
);

export default StoreWrap;
