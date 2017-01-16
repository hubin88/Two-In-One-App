/**
 * Created by admin on 2016/12/27.
 */
import postJSON from '../helper';
import * as InterFace from './inter-face-type';

export default class Api {

  // 登录
  static login(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.LOGIN,
      data: obj,
      name: Api.login.name,
    });
  }

  // 注册
  static register(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.REG,
      data: obj,
      name: Api.register.name,
    });
  }

  // 忘记密码
  static forgetPassword(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.FORGET_PWD,
      data: obj,
      name: Api.forgetPassword.name,
    });
  }

  // 获取验证码
  static getCode(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_CODE,
      data: obj,
      name: Api.getCode.name,
    });
  }

  // 查询机构信息
  static getOrgsName(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.GET_ORGS,
      data: obj,
      name: Api.getOrgsName.name,
    });
  }

  // 系统设置是否注册,版本升级
  static queryRegistInfo(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.QUERY_REGISTINFO,
      data: obj,
      name: Api.queryRegistInfo.name,
    });
  }

  //重设手机号码
  static resetPhone(obj = {}) {
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.RESET_PHONE_NUMBER,
      data: obj,
      name: Api.resetPhone.name,
    });
  }

  //重设密码
  static resetPassword(obj = {}){
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.RESET_PASSWORD,
      data: obj,
      name: Api.resetPassword.name,
    });
  }

  //退出登录
  static loginOut(obj = {}){
    return postJSON({
      interFacePre: InterFace.TRADE_DIR,
      interFacePos: InterFace.LOGIN_OUT,
      data: obj,
      name: Api.loginOut.name,
    });
  }
}
