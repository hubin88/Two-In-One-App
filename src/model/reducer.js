import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as ActionTypes from './action-types';
import marketInfo from './market/reducer-market';
import { Cookie } from '../ultils/tools';
import { arrayToObject } from '../ultils/helper';
import { SYS_DCB, SYS_DWB, NONE, ORG_ID } from '../server/define';
import AppConfig from '../server/app-config';

const initSystemList = [];
const localExchangeData = Cookie.getCookie('exchangeData') || {};
// 交易所的信息
const initExchangeInfo = {
  exchangeList: [],
  exchangeId: parseInt(localExchangeData.id || NONE, 10),
  exchangeName: localExchangeData.name || '',
  exchangeLogoUrl: localExchangeData.logoUrl || '',
  isSingleSystem: false, // 只有一个系统
  systemList: initSystemList,
  orgId: NONE,
  commodityData: {},
};

// 切换不同系统，底部导航栏，资金展示方式，个人中心功能点会有所变化
const initSystemInfo = {
  systemType: SYS_DCB,
  isLogin: false,
  loginData: {},
  avatarURL: require('../images/me_image_avator@3x.png'),
  nickName: '',
  mobile: null,
  navList: {
    home: { name: 'home', label: '首页', direction: '/home' },
    track: { name: 'broker', label: '经纪人', direction: '/broker' },
    rule: { name: 'rule', label: '规则', direction: '/rule' },
    user: { name: 'user', label: '我', direction: '/user' },
  },
  assetInfo: {
    // allCash: '',
    // availableCash: '',
    // frozenCash: '',
    // cashEarnAll: '',
  },
  checkChannel: [
    { type: 'pay', label: '充值', direction: '/pay' },
    { type: 'withdraw', label: '提现', direction: '/withdraw' },
  ],
};

const initCommodityState = {
  commodityId: null,
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
    case ActionTypes.REQUEST_GET_ONE_EXCHANGE_INFO: {
      const {
        exchangeData: { id: exchangeId, name: exchangeName, logoUrl: exchangeLogoUrl },
      } = action;
      Cookie.setCookie('exchangeData', action.exchangeData);
      // TODO：切换系统后，清除登录状态。（产品要求切换失败时返回原来交易所，此处不支持）
      Cookie.deleteCookie(`${SYS_DCB}-isLogin`);
      Cookie.deleteCookie(`${SYS_DWB}-isLogin`);
      return {
        ...state,
        exchangeId,
        exchangeName,
        exchangeLogoUrl,
      };
    }
    case ActionTypes.SUCCESS_GET_ONE_EXCHANGE_INFO: {
      // TODO: 特殊处理，现在的接口对于不同系统是不同的orgId
      const { exchangeInfo: { system: systemList } } = action;
      return {
        ...state,
        isSingleSystem: systemList ? systemList.length === 1 : false,
        systemList,
      };
    }
    case ActionTypes.SUCCESS_GET_COMMODITY_SERVERS: {
      const { Merchs: commodity = [], SecKey: secKey = null } = JSON.parse(action.commodityStr);
      return {
        ...state,
        commodityData: arrayToObject(commodity, 'AssetId'),
        secKey,
      };
    }
    case ActionTypes.CHANGE_SYSTEM_TYPE: {
      return {
        ...state,
        orgId: ORG_ID[action.systemType],
      };
    }
    default: {
      return state;
    }
  }
}

// 系统信息
function systemInfo(state = initSystemInfo, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_SYSTEM_TYPE: {
      Cookie.setCookie('systemType', action.systemType);
      return {
        ...state,
        systemType: action.systemType,
        isLogin: Cookie.getCookie(`${AppConfig.systemType()}-isLogin`) || false,
      };
    }
    case ActionTypes.SUCCESS_GET_LOGIN_INFO: {
      Cookie.setCookie(`${AppConfig.systemType()}-isLogin`, true);
      Cookie.setCookie('loginData', action.data);
      return {
        ...state,
        loginData: action.data,
        isLogin: true,
      };
    }
    case ActionTypes.SUCCESS_LOGOUT: {
      Cookie.setCookie(`${AppConfig.systemType()}-isLogin`, false);
      return {
        ...state,
        isLogin: false,
      };
    }
    case ActionTypes.SUCCESS_QUERY_USER_INFO_GATEWAY: {
      return {
        ...state,
        assetInfo: action.data,
      };
    }
    case ActionTypes.SUCCESS_FIND_USER: {
      const { headImg: avatarURL, nikeName: nickName, mobile } = action.data;
      return {
        ...state,
        avatarURL: `data:image/png;base64,${avatarURL}`,
        nickName,
        mobile,
      };
    }
    default: {
      return state;
    }
  }
}

// 商品状态
function commodityState(state = initCommodityState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_COMMODITY_ID: {
      return {
        ...state,
        commodityId: action.commodityId,
      };
    }
    default: {
      return state;
    }
  }
}
export default combineReducers({
  exchangeInfo,
  marketInfo,
  systemInfo,
  commodityState,
  routing: routerReducer,
});
