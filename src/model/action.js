import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';
import TradeApi from '../server/api/trade-api';
import SysApi from '../server/api/sys-api';
import AppConfig from '../server/app-config';
import { arrayToObject } from '../ultils/helper';

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
export function requestGetOneExchangeInfo(exchangeData) {
  return {
    type: ActionTypes.REQUEST_GET_ONE_EXCHANGE_INFO,
    exchangeData,
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
export function toGetOneExchangeInfo(exchangeData) {
  return function wrap(dispatch) {
    dispatch(requestGetOneExchangeInfo(exchangeData));
    return SysApi.getOneExchangeInfo({ exchangeId: exchangeData.id })
    // TODO: 模拟不同交易所返回不同数据
      .then(data => dispatch(successGetOneExchangeInfo(data[exchangeData.id])))
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

/* === 获取行情数据 === */
export function successGetQuotesInfo(quotes) {
  return {
    type: ActionTypes.SUCCESS_GET_QUOTES,
    quotes,
  };
}
export function errorGetQuotesInfo() {
  return {
    type: ActionTypes.ERROR_GET_QUOTES,
  };
}
export function toGetQuotesInfo() {
  return function wrap(dispatch) {
    SysApi.getQuotesInfo()
      .then((quotes) => dispatch(successGetQuotesInfo(quotes)))
      .catch(() => dispatch(errorGetQuotesInfo()));
  };
}
/* === 获取行情数据 === */

/* === 获取用户商品数据 === */
export function requestGetUserCommodityData() {
  return {
    type: ActionTypes.REQUEST_GET_USER_COMMODITY_DATA,
  };
}
export function successGetUserCommodityData(quotes) {
  return {
    type: ActionTypes.SUCCESS_GET_USER_COMMODITY_DATA,
    quotes,
  };
}
export function errorGetUserCommodityData() {
  return {
    type: ActionTypes.ERROR_GET_USER_COMMODITY_DATA,
  };
}
export function toGetUserCommodityData(commodityId) {
  return function wrap(dispatch) {
    requestGetUserCommodityData(commodityId);
    SysApi.getQuotesInfo(commodityId)
      .then((quotes) => dispatch(successGetUserCommodityData(quotes)))
      .catch(() => dispatch(errorGetUserCommodityData()));
  };
}
/* === 获取用户商品数据 === */

/* === 更改商品 === */
export function changeCommodityId(commodityId) {
  return {
    type: ActionTypes.CHANGE_COMMODITY_ID,
    commodityId,
  };
}
export function changeCommodity(dispatch, commodityId) {
  dispatch(changeCommodityId(commodityId));
  // dispatch(toGetQuotesInfo(commodityId));
  // dispatch(toGetUserCommodityData(commodityId));
}
export function toChangeCommodity(commodityId) {
  return function wrap(dispatch, getState) {
    if (commodityId === getState().commodityState.commodityId) return;

    changeCommodity(dispatch, commodityId);
  };
}
/* === 更改商品 === */

/* === 更改系统 === */
export function changeSystemType(systemType) {
  return {
    type: ActionTypes.CHANGE_SYSTEM_TYPE,
    systemType,
  };
}
export function changeSystem(dispatch, systemType, exchangeData) {
  // TODO: 现阶段接口不同交易系统商品是分开配置的。后期应该商品只跟交易所有关。
  dispatch(getCommodityAndServers(exchangeData));
  dispatch(changeSystemType(systemType));
}
export function toChangeSystem(systemType) {
  return function wrap(dispatch) {
    if (!systemType || systemType === Cookie.getCookie('systemType')) return;
    const exchangeData = Cookie.getCookie('exchangeData');
    dispatch(changeSystem(systemType, exchangeData));
  };
}
/* === 更改系统 === */

/* === 更改交易所 === */
export function changeExchange(dispatch, exchangeData) {
  api
    .then(() => dispatch(toGetOneExchangeInfo(exchangeData)))
    .then((action) => {
      const systemType = action.exchangeInfo.system[0].type;
      // dispatch(getCommodityAndServers(exchangeData));
      changeSystem(dispatch, systemType, exchangeData);
    });
}
export function toChangeExchange(exchangeData) {
  return function wrap(dispatch, getState) {
    // TODO: 添加判断，如果exchangeId未改变，不重复请求
    if (getState().exchangeInfo.exchangeId === exchangeData.id) return;

    changeExchange(dispatch, exchangeData);
  };
}
/* === 更改交易所=== */

/* === 程序启动 === */
export function appStart(initExchangeData = AppConfig.exchangeData()) {
  return function wrap(dispatch) {
    return dispatch(getExchangeList())
      .then((action) => {
        const exchangeIdArr = Object.keys(arrayToObject(action.exchangeList, 'id'));
        const exchangeData = (initExchangeData &&
        exchangeIdArr.includes(JSON.stringify(initExchangeData.id))) ?
          initExchangeData.id : action.exchangeList[0];
        changeExchange(dispatch, exchangeData);
      });
  };
}
/* === 程序启动 === */

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

// 推送资产信息
export function successQueryUserInfoGateway(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_USER_INFO_GATEWAY,
    data: json,
  };
}

export function requestQueryUserInfoGateway(obj) {
  return function wrap(dispatch) {
    return TradeApi.queryUserInfoGateway(obj)
      .then(json => dispatch(successQueryUserInfoGateway(json)));
  };
}

// 获取商品，服务器信息
export function successGetMerchsAndServers(json) {
  return {
    type: ActionTypes.SUCCESS_GET_MERCHS_AND_SERVERS,
    data: json,
  };
}

export function requestGetMerchsAndServers(obj) {
  return function wrap(dispatch) {
    return SysApi.getMerchsAndServers(obj)
      .then(json => {
        const data = JSON.parse(json.result);
        dispatch(requestQueryUserInfoGateway(data.SecKey));
        dispatch(successGetMerchsAndServers(data));
      });
  };
}

/* === 登录 === */
export function requestLogin() {
  return {
    type: ActionTypes.REQUEST_LOGIN,
  };
}
export function successLogin(obj) {
  return {
    type: ActionTypes.SUCCESS_LOGIN,
    obj,
  };
}
export function errorLogin() {
  return {
    type: ActionTypes.ERROR_LOGIN,
  };
}
export function loginSuccess(obj) {
  return function wrap(dispatch) {
    // dispatch(requestLogin());
    const succObj = {
      orgId: obj.orgId,
      mobile: obj.mobile,
      sessionId: obj.sessionId,
    };
    dispatch(successLogin(obj));
    dispatch(requestGetUseData(succObj));
    dispatch(requestFindUser(succObj));
    dispatch(requestGetMerchsAndServers(succObj));
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
    return SysApi.getSysConfig()
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
