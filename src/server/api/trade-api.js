/**
 * Created by admin on 2016/12/29.
 */
import postJSON, { postWithTrade, postAsset, wrapWithUserData } from '../helper';
import * as InterFace from './inter-face-type';

export default class TradeApi {

  // 设置、修改交易密码
  static upadtePwd(obj = {}) {
    return postWithTrade(InterFace.UPADTE_PWD, obj, TradeApi.upadtePwd.name);
  }

  // 修改手机号
  static updateMobile(obj = {}) {
    return postWithTrade(InterFace.UPDATE_MOBILE, obj, TradeApi.updateMobile.name);
  }

  // 下单、建仓
  static createUserOrder(obj = {}) {
    return postWithTrade(InterFace.CREATE_USER_ORDER, obj, TradeApi.createUserOrder.name);
  }

  // 查询用户信息
  static getUsers(obj = {}) {
    return postWithTrade(InterFace.GET_USERS, obj, TradeApi.getUsers.name);
  }

  // 查询机构信息
  static getOrgs(obj = {}) {
    return postWithTrade(InterFace.GET_ORGS, obj, TradeApi.getOrgs.name);
  }

  // 修改用户
  static updateUser(obj = {}) {
    return postWithTrade(InterFace.UPDATE_USER, obj, TradeApi.updateUser.name);
  }

  // 查询用户
  static findUser(obj = {}) {
    return postWithTrade(InterFace.FIND_USER, wrapWithUserData(obj), TradeApi.findUser.name);
  }

  static getMemberList(obj = {}) {
    return postWithTrade(InterFace.GET_MEMBER_LIST, obj, TradeApi.getMemberList.name);
  }

  // 交易记录
  static getTradeRecordPage(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_TRADE_RECORD, obj, TradeApi.getTradeRecordPage.name);
  }

  // 资产推送
  static queryUserInfoGateway(obj = '') {
    return postAsset({
      interFacePos: InterFace.QUERY_USER_INFO_GATEWAY,
      data: obj,
      name: TradeApi.queryUserInfoGateway.name,
    });
  }

}
