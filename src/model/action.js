import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';
import tradeApi from '../server/api/trade-api';
import SysApi from '../server/api/sys-api';

const api = new Promise((resolve) => {
  resolve();
});

/* === 首次进入广告 ===*/
export function showFirstAD() {
  return {
    type: ActionTypes.SHOW_FIRST_AD,
  };
}
/* === 首次进入广告 ===*/

/* === 等待广告 ===*/
export function showWaitAD() {
  return {
    type: ActionTypes.SHOW_WAIT_AD,
  };
}
/* === 等待广告 ===*/

/* === 首次新手使用导航 ===*/
export function showFirstNav() {
  return {
    type: ActionTypes.SHOW_FIRST_NAV,
  };
}
/* === 等待广告 ===*/

/* === 获取交易所列表 === */
export function requestGetExchangeList() {
  return {
    type: ActionTypes.REQUEST_GET_EXCHANGE_LIST,
  };
}
export function successGetExchangeList(exchangeList) {
  return {
    type: ActionTypes.SUCCESS_GET_EXCHANGE_LIST,
    exchangeList,
  };
}
export function errorGetExchangeList() {
  return {
    type: ActionTypes.ERROR_GET_EXCHANGE_LIST,
  };
}
export function getExchangeList() {
  return function wrap(dispatch) {
    dispatch(requestGetExchangeList());
    return SysApi.getExchangeList()
      .then(data => dispatch(successGetExchangeList(data)))
      .catch(() => dispatch(errorGetExchangeList()));
  };
}
/* === 获取交易所列表 === */

/* === 获取交易所信息 === */
export function requestGetOneExchangeInfo() {
  return {
    type: ActionTypes.REQUEST_GET_ONE_EXCHANGE_INFO,
  };
}
export function successGetOneExchangeInfo(exchangeInfo) {
  return {
    type: ActionTypes.SUCCESS_GET_ONE_EXCHANGE_INFO,
    exchangeInfo,
  };
}
export function errorGetOneExchangeInfo() {
  return {
    type: ActionTypes.ERROR_GET_ONE_EXCHANGE_INFO,
  };
}
export function getOneExchangeInfo(exchangeId) {
  return function wrap(dispatch) {
    dispatch(requestGetOneExchangeInfo());
    return SysApi.getOneExchangeInfo(exchangeId)
      .then(data => dispatch(successGetOneExchangeInfo(data)))
      .catch(() => dispatch(errorGetOneExchangeInfo()));
  };
}
/* === 获取交易所信息 === */

/* === 获取商品、服务器 === */
export function requestGetCommodityAndServers() {
  return {
    type: ActionTypes.REQUEST_GET_COMMODITY_SERVERS,
  };
}
export function successGetCommodityAndServers(data) {
  return {
    type: ActionTypes.SUCCESS_GET_COMMODITY_SERVERS,
    commodityStr: data.result || '',
  };
}
export function errorGetCommodityAndServers() {
  return {
    type: ActionTypes.ERROR_GET_COMMODITY_SERVERS,
  };
}
export function getCommodityAndServers() {
  return function wrap(dispatch) {
    dispatch(requestGetCommodityAndServers());
    return SysApi.getMerchsAndServers()
      .then(data => dispatch(successGetCommodityAndServers(data)))
      .catch(() => dispatch(errorGetCommodityAndServers()));
  };
}
/* === 获取商品、服务器 === */

/* === 更改交易所 === */
export function changeExchange(exchangeId) {
  return function wrap(dispatch) {
    return dispatch(getOneExchangeInfo(exchangeId))
      .then((exchangeInfo) => {
        dispatch(getCommodityAndServers(exchangeId, exchangeInfo.systemType));
      });
  };
}
/* === 更改交易所=== */

/* === 程序启动 === */
export function appStart() {
  return function wrap(dispatch) {
    return dispatch(getExchangeList())
      .then((exList) => {
        dispatch(changeExchange(exList[0]));
      });
  };
}
/* === 程序启动 === */

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
      .catch((e) => {
        console.log(e);
        dispatch(errorLogin());
      });
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
