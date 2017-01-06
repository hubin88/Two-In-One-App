/**
 * Created by admin on 2016/11/1.
 */

import ReactDOM from 'react-dom';

export function insertComponent(component) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.render(component, el);
  return el;
}

export function removeComponentByRef(ref) {
  const p = ref.parentNode;
  ReactDOM.unmountComponentAtNode(p);
  p.parentNode.removeChild(p);
}

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}
// 判断值是否为空
export function isEmpty(strValue) {
  if (
    strValue === null ||
    strValue === undefined ||
    trim(strValue) === '' ||
    trim(strValue).toLowerCase() === 'null' ||
    trim(strValue).toLowerCase() === 'undefined'
  ) {
    return true;
  }
  return false;
}
let timeCount;
export function getCodeAgain(id, _this) {
  let TIME = 60;
  const btn = document.getElementById(id);
  _this.setState({ codeBtnValue: `${TIME}秒后重新获取`, isCodeRequest: false });
  function doTimer() {
    if (TIME > 0) {
      btn.setAttribute('disabled', true);
      timeCount = setTimeout(() => {
        _this.setState({ codeBtnValue: `${--TIME}秒后重新获取` });
        doTimer();
      }, 1000);
    } else {
      btn.removeAttribute('disabled');
      _this.setState({ codeBtnValue: '获取短信验证码', isCodeRequest: true });
    }
  }

  doTimer();
}
export function resetGetCodeAgain(id, _this) {
  const btn = document.getElementById(id);
  clearTimeout(timeCount);
  btn.removeAttribute('disabled');
  _this.setState({ codeBtnValue: '获取短信验证码', isCodeRequest: true });
}
export function resetForm(id, _this) {
  document.forms[0].reset();
  resetGetCodeAgain(id, _this);
}
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = location.search.substr(1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
}
export const regAccount = /^1[34578]{1}[0-9]{9}$/;
export const regPassword = /^\w{6}$/;
export const regCode = /^\d{4}$/;
// 判断设备
export function getDevice() {
  const UserAgent = navigator.userAgent.toLowerCase();
  if (/ipad/.test(UserAgent)) {
    return 'Ios';
  } else if (/iphone os/.test(UserAgent)) {
    return 'Ios';
  } else if (/android/.test(UserAgent)) {
    return 'android';
  } else if (/windows ce/.test(UserAgent)) {
    return 'Windows CE';
  } else if (/windows mobile/.test(UserAgent)) {
    return 'Windows Mobile';
  } else if (/windows nt 5.0/.test(UserAgent)) {
    return 'Windows 2000';
  } else if (/windows nt 5.1/.test(UserAgent)) {
    return 'Windows XP';
  } else if (/windows nt 6.0/.test(UserAgent)) {
    return 'Windows Vista';
  } else if (/windows nt 6.1/.test(UserAgent)) {
    return 'Windows 7';
  } else if (/windows nt 6.2/.test(UserAgent)) {
    return 'Windows 8';
  } else if (/windows nt 6.3/.test(UserAgent)) {
    return 'Windows 8.1';
  }
  return 'Unknow';
}

