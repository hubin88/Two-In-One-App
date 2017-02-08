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

const initAvatarURL = require('../images/me_image_avator@3x.png');

// 切换不同系统，底部导航栏，资金展示方式，个人中心功能点会有所变化
const initSystemInfo = {
  systemType: SYS_DCB,
  systemSortNum: 1,
  isLogin: false,
  loginData: {},
  avatarURL: initAvatarURL,
  nickName: '',
  sessionId: null,
  mobile: null,
  orgId: NONE,
  directUrl: null,
  navList: {
    home: { name: 'home', label: '首页', direction: '/home' },
    track: { name: 'broker', label: '经纪人', direction: '/broker' },
    // rule: { name: 'rule', label: '规则', direction: '/rule' },
    user: { name: 'user', label: '我', direction: '/user' },
  },
  assetInfo: {},
  holdArray: [],
  checkChannel: [
    { type: 'pay', label: '充值', direction: '/pay' },
    { type: 'withdraw', label: '提现', direction: '/withdraw' },
  ],
  commodityId: null,
  imitateHoldArray: {
    [SYS_DCB]: [],
    [SYS_DWB]: [],
  },

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
      Cookie.deleteCookie(`${SYS_DCB}-userData`);
      Cookie.deleteCookie(`${SYS_DWB}-userData`);

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
      const userData = JSON.parse(Cookie.getCookie(`${action.systemType}-userData`)) || {};
      return {
        ...state,
        ...initSystemInfo,
        ...userData,
        systemType: action.systemType,
        systemSortNum: action.systemSortNum,
        orgId: ORG_ID[action.systemType],
        isLogin: Cookie.getCookie(`${action.systemType}-isLogin`) || false,
        imitateHoldArray: state.imitateHoldArray,
      };
    }
    case ActionTypes.CHANGE_LOGIN_STATUS: {
      Cookie.setCookie(`${AppConfig.systemType()}-isLogin`, true);
      return {
        ...state,
        isLogin: true,
      };
    }
    case ActionTypes.RESET_USER_DATA: {
      Cookie.setCookie(`${AppConfig.systemType()}-userData`, action.data);
      return {
        ...state,
        loginData: action.data,
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
      console.log(action.data);
      const {
        TotalAssets: allAssets,
        ValidAssets: validAssets,
        TotalUsed: usedAssets,
        vec,
      } = action.data;
      const holdArray = [
        ...vec, ...state.imitateHoldArray[state.systemType],
      ];
      return {
        ...state,
        assetInfo: {
          allAssets,
          validAssets,
          usedAssets,
        },
        holdArray,
      };
    }
    case ActionTypes.SUCCESS_FIND_USER: {
      const { headImg, nikeName: nickName, mobile } = action.data;
      return {
        ...state,
        avatarURL: headImg ? `data:image/png;base64,${headImg}` : initAvatarURL,
        nickName: nickName || mobile,
        mobile,
      };
    }
    case ActionTypes.SUCCESS_DIRECT: {
      return {
        ...state,
        directUrl: action.data.url,
      };
    }
    case ActionTypes.CHANGE_COMMODITY_ID: {
      return {
        ...state,
        commodityId: action.commodityId,
      };
    }
    case ActionTypes.REQUEST_CREATE_USER_ORDER: {
      const {
        commodityInfo: { AssetId, MerchCode, MarketId, Name, price },
        deposit: { fee, mount: Margin },
        direction,
      } = action.data;
      return {
        ...state,
        imitateHoldArray: {
          ...state.imitateHoldArray,
          [state.systemType]: [
            ...state.imitateHoldArray[state.systemType],
            {
              orderId: '',
              MarketId,
              Name,
              AssetId,
              MerchCode,
              Price: price[1],
              Margin,
              earnBase: fee,
              direction,
            },
          ],
        },
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
  routing: routerReducer,
});
