/**
 * Created by Amg on 2016/12/27.
 */
import { postWithTrade, postJSONImitate } from '../helper';
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
    return postWithTrade(InterFace.LOGOUT, obj, SysApi.logout.name);
  }

  // 获取系统配置
  static getSysConfig(obj = {}) {
    return postWithTrade(InterFace.GET_SYS_CONFIG, obj, SysApi.getSysConfig.name);
  }

  // 获取用户数据
  static getUserData(obj = {}) {
    return postWithTrade(InterFace.GET_USER_DATA, obj, SysApi.getUserData.name);
  }

  // 获取商品、服务器信息（不传参数，不返回SecKey）
  static getMerchsAndServers(obj = {}) {
    return postWithTrade(InterFace.GET_MERCHS_AND_SERVERS, obj, SysApi.getMerchsAndServers.name);
  }

  static getUseData(obj = {}) {
    return postWithTrade(InterFace.GET_USER_DATA, obj, SysApi.getUseData.name);
  }

}

