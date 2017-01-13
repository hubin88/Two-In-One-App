/**
 * Created by Amg on 2016/12/26.
 */

import 'fetch-ie8';
import AppConfig from './app-config';
import AjaxConfig from './api/ajax-config';
import { safeGetParameter } from '../ultils/helper';
import imitateData from './imitateData';
import * as InterFace from './api/inter-face-type';

const postDataFormat = (systemType) => {
  const formatConfig = AjaxConfig[systemType];
  return (obj, interFace) => {
    if (!formatConfig || typeof formatConfig === 'undefined') return obj;
    // TODO: 要添加对于可以不传参数的情况下，直接请求，跳过数据格式化！！！
    if (typeof obj === 'undefined') return obj;
    const requestDataFormat = formatConfig[interFace];
    if (!requestDataFormat || requestDataFormat === null) return obj;
    const o = {};
    Object.keys(requestDataFormat).forEach((key) => {
      o[key] = obj[requestDataFormat[key]];
    });
    return o;
  };
};

function ajax(url, obj, systemType, name) {
  const postData = (typeof obj === 'object') ? JSON.stringify(obj) : obj;
  return fetch(`${url}?${name}(${systemType})`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: `{params:${postData}}`,
  }).then(res => res.json()).then((rs) => {
    if (DEBUG) {
      // 输出网络记录
      // console.groupCollapsed(`[POST] [${name}] `, rs);
      // console.log(`%c${postData}`, 'font-style:italic;color:#666');
      // console.groupEnd();
    }
    if (parseInt(rs.code, 10) !== 0) {
      console.error(`调用失败! ${JSON.stringify(rs)}`);
      throw new Error(rs.message);
    }
    return rs;
  });
}

function postJSON(param) {
  const baseServerType = param.serverType || AppConfig.systemType();
  const pre = param.interFacePre ? safeGetParameter(param.interFacePre, baseServerType) : '';
  const pos = param.interFacePos ? safeGetParameter(param.interFacePos, baseServerType) : '';

  // TODO: 单独处理顶层请求（不分系统）
  const url = `${BASE_SERVER[baseServerType]}${pre}${pos}`;
  const postData = postDataFormat(baseServerType)(param.data, param.name);
  return ajax(url, postData, baseServerType, param.name);
}

function postWithTrade(pos, data, name) {
  const o = {
    interFacePre: InterFace.TRADE_DIR,
    interFacePos: pos,
    data,
    name,
  };
  return postJSON(o);
}

/* === 模拟暂不存在接口请求 === */
const api = new Promise((resolve) => {
  resolve();
});

const ajaxImitate = (url, postData, systemType, name) => {
  console.log('进入模拟');
  return api
    .then(() => {
      // console.log('url', url);
      console.log('postData', postData);
      // console.log('systemType', systemType);
      // console.log('name', name);
      return imitateData[name];
    });
};

function postJSONImitate(param) {
  const baseServerType = param.serverType || AppConfig.systemType();
  const pre = param.interFacePre ? safeGetParameter(param.interFacePre, baseServerType) : '';
  const pos = param.interFacePos ? safeGetParameter(param.interFacePos, baseServerType) : '';

  // TODO: 单独处理顶层请求（不分系统）
  const url = `${BASE_SERVER[baseServerType]}${pre}${pos}`;
  const postData = postDataFormat(baseServerType)(param.data, param.name);
  return ajaxImitate(url, postData, baseServerType, param.name);
}

/* === 模拟暂不存在接口请求 === */

/* 资产推送请求 */
function ajaxAsset(url, obj) {
  return fetch(`${url}?SecKey=${obj}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {},
  }).then(res => res.json()).then((rs) => {
    if (parseInt(rs.status, 10) !== 0) {
      console.error(`调用失败! ${JSON.stringify(rs)}`);
      throw new Error(rs.msg);
    }
    return rs;
  });
}
export function postAsset(param) {
  const baseServerType = AppConfig.systemType();
  const pre = param.interFacePre ? safeGetParameter(param.interFacePre, baseServerType) : '';
  const pos = param.interFacePos ? safeGetParameter(param.interFacePos, baseServerType) : '';
  let assetUrl;
  if (baseServerType === 'DCB') {
    assetUrl = 'DCBASSET';
  } else {
    assetUrl = 'DWBASSET';
  }
  const url = `${BASE_SERVER[assetUrl]}${pre}${pos}`;
  const postData = postDataFormat(baseServerType)(param.data, param.name);
  return ajaxAsset(url, postData, baseServerType, param.name);
}
export default postJSON;
export { postWithTrade, postJSONImitate };
