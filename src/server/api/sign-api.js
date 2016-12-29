/**
 * Created by Amg on 2016/12/27.
 */

import postJSON from '../helper';
import * as InterFace from '../inter-face-type';

// 用户注册登录用接口
export default class SignApi {

  static register(obj) {
    return postJSON(InterFace.TRADE_DIR, InterFace.REG, obj, SignApi.register.name);
  }

  static login(obj) {
    return postJSON(InterFace.TRADE_DIR, InterFace.LOGIN, obj, SignApi.login.name);
  }
}
