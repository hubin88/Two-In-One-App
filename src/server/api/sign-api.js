/**
 * Created by admin on 2016/12/27.
 */
import { browserHistory } from 'react-router';
import Tips from '../../views/sign/cummon/tips';
import { getCodeAgain, resetForm } from '../tools';
import TradeApi from './trade-api';

export default class Api {
  // 获取验证码
  static getCode(id, _this, opts) {
    TradeApi.getCodeRequest(opts).then((json) => {
      if (json.code === 0) {
        getCodeAgain(id, _this);
        return Tips.show(json.message);
      }
      return Tips.show(json.message);
    });
  }

  // 提交注册
  static registerSubmit(opts, flag, url, id, _this) {
    TradeApi.register(opts).then((json) => {
      if (json.code === 0) {
        if (flag) {
          if (!url) return false;
          Tips.show(json.message);
          resetForm(id, _this);
          window.location.href = url;
          return false;
        }
        resetForm(id, _this);
        return false;
      }
      return Tips.show(json.message);
    });
  }

  // 获取下载链接
  static getDownLoadUrl(options) {
    return TradeApi.queryRegist(options);
  }

  // 获取机构信息
  static getOrgInfo(options) {
    return TradeApi.getOrgsName(options);
  }

  // 登录
  static loginSubmit(opts, path) {
    TradeApi.login(opts).then((json) => {
      if (json.code === 0) {
        browserHistory.push(path);
        return false;
      }
      return Tips.show(json.message);
    });
  }

  // 忘记密码
  static forgetPwdSubmit(opts, path) {
    TradeApi.forgetPassword(opts).then((json) => {
      if (json.code === 0) {
        browserHistory.push(path);
        return false;
      }
      return Tips.show(json.message);
    });
  }
}
