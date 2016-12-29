/**
 * Created by Amg on 2016/12/27.
 */
import postJSON from '../helper';
import * as InterFace from '../inter-face-type';

// 用户注册登录用接口
export default class SysApi {

  // 获取系统配置
  static getSysConfig(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_SYS_CONFIG, obj, SysApi.getSysConfig.name);
  }
  // 获取用户数据
  static getUserData(obj = {}) {
    return postJSON(InterFace.TRADE_DIR, InterFace.GET_USER_DATA, obj, SysApi.getUserData.name);
  }
}
