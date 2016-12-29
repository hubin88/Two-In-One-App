/**
 * Created by Amg on 2016/12/26.
 */

import 'fetch-ie8';
import AppConfig from './app-config';
import AjaxConfig from './ajax-config';

const postDataFormat = (systemType) => {
  const formatConfig = AjaxConfig[systemType];
  return (obj, interFace) => {
    const requestDataFormat = formatConfig[interFace];
    if (requestDataFormat === null) return obj;
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
      console.groupCollapsed(`[POST] [${name}] `, rs);
      console.log(`%c${postData}`, 'font-style:italic;color:#666');
      console.log(`%c${JSON.stringify(rs, null, '\t')}`, 'color:green');
      console.groupEnd();
    }

    if (rs.code !== '0') {
      console.error(`调用失败! ${JSON.stringify(rs)}`);
      throw new Error(rs.msg);
    }
    return rs;
  });
}

function postJSON(pre, pos, obj, name = 'test') {
  const systemType = AppConfig.systemType();
  const url = `${BASE_SERVER[systemType]}${pre[systemType]}${pos}`;
  const postData = postDataFormat(systemType)(obj, name);
  return ajax(url, postData, systemType, name);
}

export default postJSON ;
