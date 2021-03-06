/**
 * Created by Amg on 2016/12/26.
 */
import * as ActionQuoteTypes from './action-type-market';
import { arrayToObject } from '../../ultils/helper';

const initMarketInfo = {
  normalday: {},
  commodityPricesOld: {},
  commodityPrices: {},
  // quotInfo: {},
};
export default function marketInfo(state = initMarketInfo, action) {
  switch (action.type) {
    case ActionQuoteTypes.SUCCESS_QUERY_NORMAL_DAY: {
      return {
        ...state,
        normalday: action.data.result,
      };
    }
    case ActionQuoteTypes.SUCCESS_QUERY_TIME_SHARE: {
      return {
        ...state,
        timeShare: action.data.result,
      };
    }
    case ActionQuoteTypes.SUCCESS_GET_QUOT: {
      return {
        ...state,
        commodityPricesOld: state.commodityPrices,
        commodityPrices: arrayToObject(action.data.result, 0),
      };
    }
    default:
      return state;
  }
}
