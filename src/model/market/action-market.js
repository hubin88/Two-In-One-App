/**
 * Created by Amg on 2016/12/26.
 */
import * as ActionTypes from '../market/action-type-market';
import QuotationApi from '../../server/api/quotation-api';
// 获取分时K线
export function successQueryTimeShare(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_TIME_SHARE,
    data: json,
  };
}
export function requestQueryTimeShare(obj, o) {
  return function wrap(dispatch) {
    return QuotationApi.queryTimeShare(obj)
      .then(json => {
        console.log(json.result);
        dispatch(successQueryTimeShare(json));
        o.chart.drawChart(json.result);
      });
  };
}
// 获取分钟K线
export function successQueryMinuteLine(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_MINUTE_LINE,
    data: json,
  };
}

export function requestQueryMinuteLine(obj, o) {
  return function wrap(dispatch) {
    return QuotationApi.queryMinuteLine(obj)
      .then(json => {
        o.kLine.drawKLine(json.result);
        dispatch(successQueryMinuteLine(json));
      });
  };
}
// 获取交易日，交易时间
export function successQueryNormalday(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_NORMAL_DAY,
    data: json,
  };
}

export function requestQueryNormalday(obj) {
  return function wrap(dispatch) {
    return QuotationApi.queryNormalDay(obj)
      .then(json => {
        dispatch(successQueryNormalday(json));
        // dispatch(requestQueryTimeShare(json));
      });
  };
}

// 获取日K线,周K,月K线
export function successQueryDayLine(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_DAY_LINE,
    data: json,
  };
}
export function requestQueryDayLine() {
  return function wrap(dispatch) {
    return QuotationApi.queryDayLine()
      .then(json => dispatch(successQueryDayLine(json)));
  };
}

// 获取配置K线周期
export function successQueryPeriod(json) {
  return {
    type: ActionTypes.SUCCESS_QUERY_PERIOD,
    data: json,
  };
}
export function requestQueryPeriod() {
  return function wrap(dispatch) {
    return QuotationApi.queryPeriod()
      .then(json => dispatch(successQueryPeriod(json)));
  };
}

// 获取个股行情
export function successGetQuot(json) {
  return {
    type: ActionTypes.SUCCESS_GET_QUOT,
    data: json,
  };
}
export function requestGetQuot(obj) {
  return function wrap(dispatch) {
    return QuotationApi.getQuot(obj)
      .then(json => dispatch(successGetQuot(json)));
  };
}

// 订阅
export function successSubscribe(json) {
  return {
    type: ActionTypes.SUCCESS_SUBSCRIBE,
    data: json,
  };
}
export function requestSubscribe() {
  return function wrap(dispatch) {
    return QuotationApi.subscribe()
      .then(json => dispatch(successSubscribe(json)));
  };
}
