import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';
import TradeApi from '../server/api/trade-api';
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

/* 获取用户数据 */
export function successGetUseData(json) {
  return {
    type: ActionTypes.SUCCESS_GET_USE_DATA,
    data: json,
  };
}

export function requestGetUseData(obj) {
  return function wrap(dispatch) {
    return SysApi.getUseData(obj)
      .then(json => dispatch(successGetUseData(json)));
  };
}

/* 查询用户 */
export function successFindUser(json) {
  return {
    type: ActionTypes.SUCCESS_FIND_USER,
    data: json,
  };
}

export function requestFindUser(obj) {
  return function wrap(dispatch) {
    return TradeApi.findUser(obj)
      .then(json => dispatch(successFindUser(json)));
  };
}

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
export function login(obj) {
  return function wrap(dispatch) {
    dispatch(requestLogin());
    return TradeApi.login(obj)
      .then(() => {
        const objs = {
          orgId: obj.orgId,
          mobile: obj.mobile,
        };
        dispatch(successLogin());
        dispatch(requestGetUseData(objs));
        dispatch(requestFindUser(objs));
      })
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
export function successQueryRegistInfo(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_REGIST_INFO,
    data: json,
  };
}

export function requestQueryRegistInfo() {
  return function wrap(dispatch) {
    return TradeApi.queryRegistInfo()
      .then(json => dispatch(successQueryRegistInfo(json)));
  };
}

/* 检查机构信息 */
export function successGetOrgs(json) {
  return {
    type: ActionTypes.SUCCESS_GET_ORGS,
    data: json,
  };
}

export function requestGetOrgs() {
  return function wrap(dispatch) {
    return TradeApi.getOrgs()
      .then(json => dispatch(successGetOrgs(json)));
  };
}

/* 修改用户 */
export function successUpdateUser(json) {
  return {
    type: ActionTypes.SUCCESS_UPDATE_USER,
    data: json,
  };
}

export function requestUpdateUser() {
  return function wrap(dispatch) {
    return TradeApi.updateUser()
      .then(json => dispatch(successUpdateUser(json)));
  };
}


/* 获取系统配置 */
export function successGetSysconfig(json) {
  return {
    type: ActionTypes.SUCCESS_GET_SYS_CONFIG,
    data: json,
  };
}

export function requestGetSysconfig() {
  return function wrap(dispatch) {
    return SysApi.getMerchsAndServers()
      .then(json => dispatch(successGetSysconfig(json)));
  };
}


/* 查询客户交易记录 */
export function successGetTradeRecordPage(json) {
  return {
    type: ActionTypes.SUCCESS_GET_TRADE_RECORD_PAGE,
    data: json,
  };
}

export function requestGetTradeRecordPage() {
  return function wrap(dispatch) {
    return TradeApi.getTradeRecordPage()
      .then(json => dispatch(successGetTradeRecordPage(json)));
  };
}

/* 忘记密码 */
export function successForgetPwd(json) {
  return {
    type: ActionTypes.SUCCESS_FORGET_PWD,
    data: json,
  };
}

export function requestForgetPwd() {
  return function wrap(dispatch) {
    return TradeApi.forgetPwd()
      .then(json => dispatch(successForgetPwd(json)));
  };
}

/* 发送验证码 */
export function successSendCaptcha(json) {
  return {
    type: ActionTypes.SUCCESS_SEND_CAPTCHA,
    data: json,
  };
}

export function requestSendCaptchas() {
  return function wrap(dispatch) {
    return TradeApi.getCodeRequest()
      .then(json => dispatch(successSendCaptcha(json)));
  };
}

// 查询交易所机构
export function successGetMemberList(json) {
  return {
    type: ActionTypes.SUCCESS_GET_MEMBER_LIST,
    data: json,
  };
}

export function requestGetMemberList() {
  return function wrap(dispatch) {
    return TradeApi.getMemberList()
      .then(json => dispatch(successGetMemberList(json)));
  };
}

// 推送资产信息
export function successQueryUserInfoGateway(json) {
  return {
    type: ActionTypes.SUCCESS_GET_MEMBER_LIST,
    data: json,
  };
}

export function requestQueryUserInfoGateway() {
  return function wrap(dispatch) {
    return TradeApi.queryUserInfoGateway()
      .then(json => dispatch(successQueryUserInfoGateway(json)));
  };
}
