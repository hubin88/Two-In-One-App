import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from './action-types';
import { Cookie } from '../ultils/tools';

// 交易所的信息
const initExchangeInfo = {
  exchangeList: [],
  isSingleSystem: false, // 只有一个系统
  systemList: {
    1: { type: 'DCB', label: '点差宝', sort: 1 },
    2: { type: 'DWB', label: '点微宝', sort: 2 },
  },
};

// 不同交易所有不同的行情数据
// const marketInfo = {};

// 切换不同系统，底部导航栏，资金展示方式，个人中心功能点会有所变化
const initSystemInfo = {
  systemType: 'DCB',
  isLogin: false,
  avatarURL: require('../images/me_image_avator@3x.png'),
  nickName: 'user nickname',
  navList: {
    home: { name: 'home', label: '首页', direction: '/home' },
    track: { name: 'track', label: '轨迹', direction: '/track' },
    rule: { name: 'rule', label: '规则', direction: '/rule' },
    user: { name: 'user', label: '我', direction: '/user' },
  },
  assetInfo: {
    allCash: '',
    availableCash: '',
    frozenCash: '',
    cashEarnAll: '',
  },
  checkChannel: {
    pay: '',
    withdraw: '',
  },
};

// 交易所信息
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

// 系统信息
function systemInfo(state = initSystemInfo, action) {
  switch (action.type) {
    case ActionTypes.SUCCESS_CHANGE_SYSTEM: {
      return {
        ...state,
        systemType: action.systemType,
      };
    }
    case ActionTypes.SUCCESS_LOGIN: {
      return {
        ...state,
        isLogin: true,
      };
    }
    case ActionTypes.SUCCESS_LOGOUT: {
      Cookie.setCookie('systemType', state.systemType);
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
export default combineReducers({
  exchangeInfo,
  systemInfo,
  routing: routerReducer,
});
