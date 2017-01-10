/**
 * Created by admin on 2016/12/29.
 */
import postJSON, { postAsset } from '../helper';
import * as InterFace from './inter-face-type';

export default class TradeApi {

  // 设置、修改交易密码
  static upadtePwd(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.UPADTE_PWD,
      data: obj,
      name: TradeApi.upadtePwd.name,
    });
  }

  // 修改手机号
  static updateMobile(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.UPDATE_MOBILE,
      data: obj,
      name: TradeApi.updateMobile.name,
    });
  }

  // 下单、建仓
  static createUserOrder(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.CREATE_USER_ORDER,
      data: obj,
      name: TradeApi.createUserOrder.name,
    });
  }

  // 查询用户信息
  static getUsers(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_USERS,
      data: obj,
      name: TradeApi.getUsers.name,
    });
  }

  // 查询机构信息
  static getOrgs(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_ORGS,
      data: obj,
      name: TradeApi.getOrgs.name,
    });
  }

  // 修改用户
  static updateUser(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.UPDATE_USER,
      data: obj,
      name: TradeApi.updateUser.name,
    });
  }

  // 查询用户
  static findUser(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.FIND_USER,
      data: obj,
      name: TradeApi.findUser.name,
    });
  }

  // 系统设置是否注册
  static queryRegistInfo(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.QUERY_REGISTINFO,
      data: obj,
      name: TradeApi.queryRegistInfo.name,
    });
  }

  // 查询交易所会员机构
  static getMemberList(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_MEMBER_LIST,
      data: obj,
      name: TradeApi.getMemberList.name,
    });
  }

  // 交易记录
  static getTradeRecordPage(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.CLOSE_USER_ORDER,
      data: obj,
      name: TradeApi.getTradeRecordPage.name,
    });
  }

  // 忘记密码
  static forgetPwd(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GORGET_PWD,
      data: obj,
      name: TradeApi.forgetPwd.name,
    });
  }

  // 发送验证码
  static sendCaptcha(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.SEND_CAPTCHA,
      data: obj,
      name: TradeApi.sendCaptcha.name,
    });
  }

  static queryUserInfoGateway(obj = '444GLD02cFXWCb286da9P0X1Hc1e1ba46262N7e2DJI4bf6CX693LO') {
    return postAsset({
      interFacePos: InterFace.QUERY_USER_INFO_GATEWAY,
      data: obj,
      name: TradeApi.queryUserInfoGateway.name,
    });
  }
}
