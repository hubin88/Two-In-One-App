/**
 * Created by admin on 2016/12/29.
 */
import postJSON from '../helper';
import * as InterFace from './inter-face-type';

export default class TradeApi {
  // 登录
  static login(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.LOGIN, obj, TradeApi.login.name);
  }

  // 注册
  static register(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.REG, obj, TradeApi.register.name);
  }

  // 忘记密码
  static forgetPassword(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.FORGET_PWD, obj, TradeApi.forgetPassword.name);
  }

  // 获取验证码
  static getCodeRequest(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_CODE, obj, TradeApi.getCodeRequest.name);
  }

  // 设置、修改交易密码
  static upadtePwd(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.UPADTE_PWD, obj, TradeApi.upadtePwd.name);
  }

  // 修改手机号
  static updateMobile(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.UPDATE_MOBILE, obj, TradeApi.updateMobile.name);
  }

  // 下单、建仓
  static createUserOrder(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.CREATE_USER_ORDER, obj, TradeApi.createUserOrder.name);
  }

  // 查询用户信息
  static getUsers(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_USERS, obj, TradeApi.getUsers.name);
  }

  // 查询机构信息
  static getOrgs(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_ORGS, obj, TradeApi.getOrgs.name);
  }

  // 修改用户
  static updateUser(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.UPDATE_USER, obj, TradeApi.updateUser.name);
  }

  // 查询用户
  static findUser(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.FIND_USER, obj, TradeApi.findUser.name);
  }

  // 系统设置是否注册,版本升级
  static queryRegistInfo(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.QUERY_REGISTINFO, obj, TradeApi.queryRegistInfo.name);
  }

  // 查询交易所会员机构
  static getMemberList(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_MEMBER_LIST, obj, TradeApi.getMemberList.name);
  }
  // 交易记录
  static getTradeRecordPage(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.CLOSE_USER_ORDER, obj, TradeApi.getTradeRecordPage.name);
  }
  // 忘记密码
  static forgetPwd(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GORGET_PWD, obj, TradeApi.forgetPwd.name);
  }
  // 发送验证码
  static sendCaptcha(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.SEND_CAPTCHA, obj, TradeApi.sendCaptcha.name);
  }
}
