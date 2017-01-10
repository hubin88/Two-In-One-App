/**
 * Created by Amg on 2016/12/27.
 */
import postJSON, { postJSONImitate } from '../helper';
import * as InterFace from './inter-face-type';

// 系统相关接口
export default class SysApi {
  // 获取交易所列表
  static getExchangeList(obj) {
    return postJSONImitate({
      interFacePre: InterFace.GET_EXCHANGE_LIST,
      data: obj,
      name: SysApi.getExchangeList.name,
      serverType: 'EXCHANGE',
    });
  }

  // 获取单个交易所数据
  static getOneExchangeInfo(obj) {
    return postJSONImitate({
      interFacePre: InterFace.GET_ONE_EXCHANGE_INFO,
      data: obj,
      name: SysApi.getOneExchangeInfo.name,
      serverType: 'EXCHANGE',
    });
  }

  // 退出登录
  static logout(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.LOGOUT,
      data: obj,
      name: SysApi.logout.name,
    });
  }

  // 获取系统配置
  static getSysConfig(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_SYS_CONFIG,
      data: obj,
      name: SysApi.getSysConfig.name,
    });
  }

  // 获取用户数据
  static getUserData(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_USER_DATA,
      data: obj,
      name: SysApi.getUserData.name,
    });
  }

  // 获取商品、服务器信息（不传参数，不返回SecKey）
  static getMerchsAndServers(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_MERCHS_AND_SERVERS,
      data: obj,
      name: SysApi.getMerchsAndServers.name,
    });
  }

  static getUseData(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_USER_DATA, obj, SysApi.getUseData.name);
  }

}

