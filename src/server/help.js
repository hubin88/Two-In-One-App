/**
 * Created by admin on 2016/12/27.
 */
import 'fetch-ie8';
import { getQueryString } from './tools';

export const common = d => ({ params: { ...d } });
export const systemType = getQueryString('systemType');
const BASE_SERVER_AJAX = {
  DCB: `${BASE_SERVER.DCB}trade/`,
  DWB: `${BASE_SERVER.DWB}weipan/`,
};
function ajaxJSON(url, obj, name) {
  const postData = (typeof obj === 'object') ? JSON.stringify(obj) : obj;
  return fetch(`${url}?${name}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: postData,
  }).then(res => res.json()).then((rs) => rs).catch(e => console.log(e));
}

export function postJSON(url, obj, name = 'test') {
  return ajaxJSON(`${BASE_SERVER_AJAX[systemType.toUpperCase()]}${url}`, obj, name);
}