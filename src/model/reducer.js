import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';
import { arrayToObject } from '../ultils/helper';
import { SYS_DCB, SYS_DWB } from '../server/define';
import AppConfig from '../server/app-config';

const initSystemList = [
  { type: SYS_DCB, label: '点差宝', sort: 1 },
  { type: SYS_DWB, label: '点微宝', sort: 2 },
];
// 交易所的信息
const initExchangeInfo = {
  exchangeList: [],
  isSingleSystem: false, // 只有一个系统
  systemList: arrayToObject(initSystemList, 'sort'),
  commodity: {},
};

// 不同交易所有不同的行情数据
// const marketInfo = {};

// 切换不同系统，底部导航栏，资金展示方式，个人中心功能点会有所变化
const initSystemInfo = {
  systemType: SYS_DCB,
  isLogin: false,
  avatarURL: require('../images/me_image_avator@3x.png'),
  nickName: 'user nickname',
  navList: {
    home: { name: 'home', label: '首页', direction: '/home' },
    track: { name: 'broker', label: '经纪人', direction: '/broker' },
    rule: { name: 'rule', label: '规则', direction: '/rule' },
    user: { name: 'user', label: '我', direction: '/user' },
  },
  assetInfo: {
    allCash: '',
    availableCash: '',
    frozenCash: '',
    cashEarnAll: '',
  },
  checkChannel: [
    { type: 'pay', label: '充值', direction: '/pay' },
    { type: 'withdraw', label: '提现', direction: '/withdraw' },
  ],
};

// 交易所信息
function exchangeInfo(state = initExchangeInfo, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_GET_EXCHANGE_LIST: {
      return {
        ...state,
        exchangeList: action.exchangeList,
      };
    }
    case ActionTypes.ERROR_GET_EXCHANGE_LIST: {
      return {
        ...state,
      };
    }
    case ActionTypes.SUCCESS_GET_COMMODITY_SERVERS: {
      const { Merchs: commodityInfo = [] } = JSON.parse(action.commodityStr);
      return {
        ...state,
        commodity: arrayToObject(commodityInfo, 'MerchCode'),
      };
    }
    case ActionTypes.SUCCESS_CHANGE_EXCHANGE: {
      return state;
    }
    default: {
      return state;
    }
  }
}

// 系统信息
function systemInfo(state = initSystemInfo, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_CHANGE_SYSTEM: {
      Cookie.setCookie('systemType', action.systemType);
      return {
        ...state,
        systemType: action.systemType,
        isLogin: Cookie.getCookie(`${AppConfig.systemType()}-isLogin`) || false,
      };
    }
    case ActionTypes.SUCCESS_LOGIN: {
      console.log(AppConfig.systemType());
      Cookie.setCookie(`${AppConfig.systemType()}-isLogin`, true);
      return {
        ...state,
        isLogin: true,
      };
    }
    case ActionTypes.SUCCESS_LOGOUT: {
      Cookie.deleteCookie(`${AppConfig.systemType()}-isLogin`);
      return {
        ...state,
        isLogin: false,
      };
    }
    default: {
      return state;
    }
  }
}

const initState = {
  orgId: null,
};

function appState(state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default combineReducers({
  exchangeInfo,
  systemInfo,
  appState,
  routing: routerReducer,
});
