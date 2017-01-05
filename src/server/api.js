/**
 * Created by admin on 2016/12/27.
 */
import { browserHistory } from 'react-router';
import { postJSON, common } from './help';
import Tips from '../views/sign/cummon/tips';
import { getCodeAgain } from './tools';

export default class Api {
  // 获取验证码
  static getCodeRequest(options) {
    return postJSON('sendCaptcha', common(options), Api.getCodeRequest.name);
  }

  static getCode(_this, opts) {
    Api.getCodeRequest(opts).then((json) => {
      if (json.code === 0) {
        getCodeAgain(_this);
        return Tips.show(json.message);
      }
      return Tips.show(json.message);
    });
  }

  // 提交注册
  static register(options) {
    return postJSON('register', common(options), Api.register.name);
  }

  static registerSubmit(opts, flag, url, path) {
    Api.register(opts).then((json) => {
      if (json.code === 0) {
        if (flag) {
          if (!url) return false;
          Tips.show(json.message);
          window.location.href = url;
          return false;
        }
        browserHistory.push(path);
        return false;
      }
      return Tips.show(json.message);
    });
  }

  // 获取下载链接
  static getDownLoadUrl(options) {
    return postJSON('queryRegistInfo', common(options), Api.getDownLoadUrl.name);
  }

  // 获取机构信息
  static getOrgInfo(options) {
    return postJSON('getOrgs', common(options), Api.getOrgInfo.name);
  }

  // 登录
  static login(options) {
    return postJSON('login', common(options), Api.login.name);
  }

  static loginSubmit(opts, path) {
    Api.login(opts).then((json) => {
      if (json.code === 0) {
        browserHistory.push(path);
        return false;
      }
      return Tips.show(json.message);
    });
  }

  // 忘记密码
  static forgetPwd(options) {
    return postJSON('forgetPwd', common(options), Api.forgetPwd.name);
  }

  static forgetPwdSubmit(opts, path) {
    Api.forgetPwd(opts).then((json) => {
      if (json.code === 0) {
        browserHistory.push(path);
        return false;
      }
      return Tips.show(json.message);
    });
  }

}
