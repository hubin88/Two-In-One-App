/**
 * Created by dz on 16/9/27.
 */
import ReactDOM from 'react-dom';
import { isArray } from './tools';

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

export function dateAddSeconds(sec) {
  return new Date((new Date()).getTime() + (sec * 1000));
}
// export function addClass(e, cls) {
//   e.setAttribute('class', `${e.getAttribute('class')} ${cls}`);
// }
//
// export function removeClass(e, cls) {
//   e.setAttribute('class', e.getAttribute('class').replace(new RegExp(` ?${cls}`), ''));
// }

export function addFavorite(url = window.location.href, title = window.document.title) {
  if (window.external && 'addFavorite' in window.external) { // IE
    window.external.addFavorite(url, title);
  } else if (window.sidebar && window.sidebar.addPanel) { // Firefox23后被弃用
    window.sidebar.addPanel(url, title);
  } else if (window.opera && window.print) { // rel=sidebar，读取a链接的href，title 注：opera也转战webkit内核了
    this.title = title;
    return true;
  } else { // webkit - safari/chrome
    alert(`请按下快捷键 ${(navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL')}+D 以添加此页面至收藏夹!`);
  }
  return false;
}

export function arrayFromStep(start, end, step = 1) {
  const arr = [];
  for (let i = start; i <= end; i += step) {
    arr.push(i);
  }
  return arr;
}

export function combineArray(keys, values) {
  if (!keys || !values) return [];
  return keys.map((key, idx) => ({ name: key, value: values[idx] }));
}

export function safeGetKey(key, obj) {
  return key.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

export function pagination(currentPageNum, maxPageNum, delta = 2) {
  const left = currentPageNum - delta;
  const right = currentPageNum + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= maxPageNum; i += 1) {
    if (i === 1 || i === maxPageNum || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let j = 0, len = range.length; j < len; j += 1) {
    const num = range[j];
    if (l) {
      if (num - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (num - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(num);
    l = num;
  }

  return rangeWithDots;
}

export function safeGetParameter(param, key) {
  if (!param) return null;
  if (typeof param === 'object' && param.length !== 0 && typeof key !== 'undefined') {
    return param[key];
  } else if (typeof param === 'string') {
    return param;
  }
  alert('错误格式化！');
  return null;
}

// 数组排序后，转换对象
export function arrayToObject(data, key) {
  return data.reduce((obj, product) => {
    const o = obj;
    if (isArray(o)) {
      o[product[key]] = [...product];
    } else {
      o[product[key]] = { ...product };
    }
    return obj;
  }, {});
}

export function pricesArrayToObject(array) {
  const arrObj = [];
  array.forEach((value) => {
    const temp = {};
    value.forEach((val, j) => {
      temp[j] = val;
    });
    arrObj.push(temp);
  });
  console.log('22', arrObj);
}
