import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';
import tradeApi from '../server/api/trade-api';

const api = new Promise((resolve, reject) => {
  console.log('Promise');
  console.log(reject);
  resolve();
});

/* === 获取交易所列表 === */
export function requestGetExchangeList() {
  return {
    type: ActionTypes.REQUEST_EXCHANGE_LIST,
  };
}
export function successGetExchangeList(exchangeList) {
  return {
    type: ActionTypes.SUCCESS_EXCHANGE_LIST,
    exchangeList,
  };
}
export function errorGetExchangeList() {
  return {
    type: ActionTypes.ERROR_EXCHANGE_LIST,
  };
}
export function getExchangeList() {
  return function wrap(dispatch) {
    dispatch(requestGetExchangeList());
    return api
      .then(data => dispatch(successGetExchangeList(data)))
      .catch(() => dispatch(errorGetExchangeList()));
  };
}
/* === 获取交易所列表 === */

/* === 获取交易所信息 === */
export function requestGetExchangeInfo() {
  return {
    type: ActionTypes.REQUEST_EXCHANGE_INFO,
  };
}
export function successGetExchangeInfo(exchangeInfo) {
  return {
    type: ActionTypes.SUCCESS_EXCHANGE_INFO,
    exchangeInfo,
  };
}
export function errorGetExchangeInfo() {
  return {
    type: ActionTypes.ERROR_EXCHANGE_INFO,
  };
}
export function getExchangeInfo() {
  return function wrap(dispatch) {
    dispatch(requestGetExchangeInfo());
    return api
      .then(data => dispatch(successGetExchangeInfo(data)))
      .catch(() => dispatch(errorGetExchangeInfo()));
  };
}
/* === 获取交易所信息 === */

/* === 切换系统 === */
export function requestChangeSystem() {
  return {
    type: ActionTypes.REQUEST_CHANGE_SYSTEM,
  };
}
export function successChangeSystem(systemType) {
  return {
    type: ActionTypes.SUCCESS_CHANGE_SYSTEM,
    systemType,
  };
}
export function errorChangeSystem() {
  return {
    type: ActionTypes.ERROR_CHANGE_SYSTEM,
  };
}
export function changeSystem(systemType) {
  Cookie.setCookie('systemType', systemType);
  return function wrap(dispatch) {
    dispatch(requestChangeSystem());
    return api
      .then(() => dispatch(successChangeSystem(systemType)))
      .catch(() => dispatch(errorChangeSystem()));
  };
}
/* === 切换系统 === */

/* === 登录 === */
export function requestLogin() {
  return {
    type: ActionTypes.REQUEST_LOGIN,
  };
}
export function successLogin() {
  return {
    type: ActionTypes.SUCCESS_LOGIN,
  };
}
export function errorLogin() {
  return {
    type: ActionTypes.ERROR_LOGIN,
  };
}
export function login() {
  return function wrap(dispatch) {
    dispatch(requestLogin());
    return api
      .then(() => dispatch(successLogin()))
      .catch(() => dispatch(errorLogin()));
  };
}
/* === 登录 === */

/* ===注册=== */
export function requestRegister() {
  return {
    type: ActionTypes.REQUEST_REG,
  };
}
export function successRegister() {
  return {
    type: ActionTypes.SUCCESS_REG,
  };
}
export function errorRegister() {
  return {
    type: ActionTypes.ERROR_REG,
  };
}
export function register() {
  return function wrap(dispatch) {
    dispatch(requestRegister());
    return api
      .then(() => dispatch(successRegister()))
      .catch(() => dispatch(errorRegister()));
  };
}
/* ===注册=== */

/* ===重置密码=== */
export function requestReset() {
  return {
    type: ActionTypes.REQUEST_RESET,
  };
}
export function successReset() {
  return {
    type: ActionTypes.SUCCESS_RESET,
  };
}
export function errorReset() {
  return {
    type: ActionTypes.ERROR_RESET,
  };
}
export function reset() {
  return function wrap(dispatch) {
    dispatch(requestReset());
    return api
      .then(() => dispatch(successReset()))
      .catch(() => dispatch(errorReset()));
  };
}
/* ===重置密码=== */


/* === 登出 === */
export function requestLogout() {
  return {
    type: ActionTypes.REQUEST_LOGOUT,
  };
}
export function successLogout() {
  return {
    type: ActionTypes.SUCCESS_LOGOUT,
  };
}
export function errorLogout() {
  return {
    type: ActionTypes.ERROR_LOGOUT,
  };
}
export function logout() {
  return function wrap(dispatch) {
    dispatch(requestLogout());
    return api
      .then(() => dispatch(successLogout()))
      .catch(() => dispatch(errorLogout()));
  };
}
/* === 登出 === */

/* 检查是否注册 */
export function successQueryRegistInfo() {
  return {
    type: ActionTypes.SUCCESS_QUERY_REGIST_INFO,
  };
}

export function requestQueryRegistInfo() {
  return function wrap(dispatch) {
    return tradeApi.queryRegistInfo()
      .then(json => dispatch(successQueryRegistInfo(json)));
  };
}
