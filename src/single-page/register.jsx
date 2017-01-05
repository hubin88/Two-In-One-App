import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../model/reducer';
import Register from '../views/sign/register';
import '../css/main.scss';

const store = DEBUG ? createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
) : createStore(rootReducer, applyMiddleware(thunkMiddleware));
const rootEl = document.getElementById('root');
ReactDOM.render(<Provider store={store}><Register /></Provider>, rootEl);

