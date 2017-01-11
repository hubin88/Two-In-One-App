/**
 * Created by admin on 2016/12/29.
 */
import { postWithTrade } from '../helper';
import * as InterFace from './inter-face-type';

export default class TradeApi {
  // 登录
  static login(obj = {}) {
    return postWithTrade(InterFace.LOGIN, obj, TradeApi.login.name);
  }

  // 注册
  static register(obj = {}) {
    return postWithTrade(InterFace.REG, obj, TradeApi.register.name);
  }

  // 忘记密码
  static forgetPwd(obj = {}) {
    return postWithTrade(InterFace.FORGET_PWD, obj, TradeApi.forgetPwd.name);
  }

  // 获取验证码
  static getCodeRequest(obj = {}) {
    return postWithTrade(InterFace.GET_CODE, obj, TradeApi.getCodeRequest.name);
  }

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
    return postWithTrade(InterFace.FIND_USER, obj, TradeApi.findUser.name);
  }

  // 系统设置是否注册,版本升级
  static queryRegistInfo(obj = {}) {
    return postWithTrade(InterFace.QUERY_REGISTINFO, obj, TradeApi.queryRegistInfo.name);
  }

  // 查询交易所会员机构
  static getMemberList(obj = {}) {
    return postWithTrade(InterFace.GET_MEMBER_LIST, obj, TradeApi.getMemberList.name);
  }

  // 交易记录
  static getTradeRecordPage(obj = {}) {
    return postWithTrade(InterFace.GET_TRADE_RECORD, obj, TradeApi.getTradeRecordPage.name);
  }


}
