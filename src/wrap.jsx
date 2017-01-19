import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
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
          <IndexRoute component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/rule" component={Rule} />
          <Route path="/user" component={User} />
        </Route>

        <Route path="/login" component={Persponal} />
        <Route path="/register" component={Persponal} />
        <Route path="/reset" component={Persponal} />
        <Route path="/resetphone" component={Persponal} />
        <Route path="/resetpwd" component={Persponal} />

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
