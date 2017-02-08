/**
 * Created by Amg on 2016/12/26.
 */
import * as ActionQuoteTypes from './action-type-market';

const initMarketInfo = {
  normalday: {},
  commodityPrices: [],
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
        // commodityPrices: action.data.result,
        commodityPrices: action.data.result,
      };
    }
    default:
      return state;
  }
}
