import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './model/reducer';
import App from './app';
import Deal from './views/deal/deal';
import Track from './views/track/track';
import Rule from './views/rule/rule';
import Info from './views/info/info';

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
) : createStore(rootReducer, applyMiddleware(thunkMiddleware));

const history = syncHistoryWithStore(browserHistory, store);

const StoreWrap = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Deal} />
        <Route path="deal" component={Deal} />
        <Route path="track" component={Track} />
        <Route path="rule" component={Rule} />
        <Route path="info" component={Info} />
      </Route>
    </Router>
  </Provider>
);

export default StoreWrap;
