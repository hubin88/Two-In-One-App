import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from './action-types';

/* ===临时=== */
function randomNum() {
  return parseFloat(Math.random() * 100).toFixed(2);
}
/* ===临时=== */

const assetLists = {
  DCB: [
    { name: 'allCash', label: '总资产', amount: randomNum() },
    { name: 'availableCash', label: '可用资金', amount: randomNum() },
    { name: 'frozenCash', label: '占用合约定金', amount: randomNum() },
  ],
  DWB: [
    { name: 'allCash', label: '总资产', amount: randomNum() },
    { name: 'availableCash', label: '可用资金', amount: randomNum() },
    { name: 'frozenCash', label: '占用资金', amount: randomNum() },
    { name: 'cashEarnAll', label: '持仓盈亏', amount: randomNum() },
  ],
};

// 交易所的信息
const initExchangeInfo = {
  exchangeList: [],
  isSingleSystem: false, // 只有一个系统
  systemList: {
    1: { type: 'DCB', label: '点差宝', sort: 1 },
    2: { type: 'DWB', label: '点微宝', sort: 2 },
  },
  checkChannel: {
    pay: { type: 'pay', label: '充值', channelURL: '' },
    withdraw: { type: 'withdraw', label: '提现', channelURL: '' },
  },
};

// 不同交易所有不同的行情数据
const marketInfo = {};

// 切换不同系统，底部导航栏，资金展示方式，个人中心功能点会有所变化
const initSystemInfo = {
  systemType: 'DCB',      //  'DCB'/'DWB'
  isLogin: false,         // 是否登录
  avatarURL: require('../images/me_image_avator@3x.png'),      // 头像
  nickName: '',           // 昵称
  navList: {              // 底部导航栏数据
    home: { name: 'home', label: '首页', direction: '/home' },
    track: { name: 'track', label: '轨迹', direction: '/track' },
    rule: { name: 'rule', label: '规则', direction: '/rule' },
    user: { name: 'user', label: '我', direction: '/user' },
  },
  assetInfo: assetLists[initExchangeInfo.systemList[1].type],      // 资产数据
  userChannel: {},                // 个人中心可跳转链接
  tradeChannel: {                 // 交易通道
    buy: {},
    sell: {},
  },
};

function exchangeInfo(state = initExchangeInfo, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_CHANGE_EXCHANGE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

function systemInfo(state = initSystemInfo, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_CHANGE_SYSTEM: {
      return {
        ...state,
        systemType: action.systemType,
        assetInfo: assetLists[action.systemType],
      };
    }
    default: {
      return state;
    }
  }
}
export default combineReducers({
  exchangeInfo,
  systemInfo,
  routing: routerReducer,
});
