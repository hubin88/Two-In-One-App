/**
 * Created by Amg on 2017/2/14.
 */

const formatUrl = (url, opt = {}) => {
  if (!url) return null;
  const urlPro = url.startsWith('http') ? '' : 'http://';
  const urlEnd = url.endsWith('/') ? '' : '/';
  const completeUrl = `${urlPro}${url}${urlEnd}`;
  const options = Object.keys(opt).reduce((arr, obj) => [...arr, `${obj}=${opt[obj]}`], []);
  return `${completeUrl}?${options.join('&')}`;
};

export default formatUrl;
