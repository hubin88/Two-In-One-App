/**
 * Created by admin on 2017/1/13.
 */
import postJSON from '../helper';
import * as InterFace from './inter-face-type';

export default class QuotationApi {
  // 获取交易日，交易时间
  static queryNormalDay(obj = {}) {
    const jsonObj = JSON.parse(obj.result);
    const assetIdsArr = [];
    jsonObj.Merchs.forEach((item) => assetIdsArr.push(item.AssetId));
    const assetIdObj = { assetIds: assetIdsArr };
    return postJSON({
      interFacePos: InterFace.QUERY_NORMAL_DAY,
      serverType: 'QUOTATION',
      data: assetIdObj,
      name: QuotationApi.queryNormalDay.name,
    });
  }

  // 获取分时K线
  static queryTimeShare(obj = {}) {
    return postJSON({
      interFacePos: InterFace.QUERY_TIME_SHARE,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.queryTimeShare.name,
    });
  }

  // 获取分钟K线
  static queryMinuteLine(obj = {}) {
    return postJSON({
      interFacePos: InterFace.QUERY_MINUTE_LINE,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.queryMinuteLine.name,
    });
  }

  // 获取日K线,周K,月K线
  static queryDayLine(obj = {}) {
    return postJSON({
      interFacePos: InterFace.QUERY_DAY_LINE,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.queryDayLine.name,
    });
  }

  // 获取配置K线周期
  static queryPeriod(obj = {}) {
    return postJSON({
      interFacePos: InterFace.QUEYR_PERIOD,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.queryPeriod.name,
    });
  }

  // 获取个股行情
  static getQuot(obj = {}) {
    return postJSON({
      interFacePos: InterFace.GET_QUOT,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.getQuot.name,
    });
  }

  // 订阅
  static subscribe(obj = {}) {
    return postJSON({
      interFacePos: InterFace.SUBSCRIBE,
      serverType: 'QUOTATION',
      data: obj,
      name: QuotationApi.subscribe.name,
    });
  }
}
