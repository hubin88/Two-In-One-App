/* ===== 公共参数 ===== */

// 后台服务器地址(后缀必须'/')
var BASE_SERVER = {
  EXCHANGE: 'http://120.76.246.19/',
  DCB: 'http://120.76.246.192:9091/',
  DWB: 'http://120.76.246.192:9092/',
  DCB_ASSET: 'http://120.76.223.65:9510/',
  DWB_ASSET: 'http://120.77.22.247:9510/',
  QUOTATION: 'http://120.25.135.199:9001/',
  // QUOTATION: 'http://120.76.246.192:9001/',

  // 测试环境
  // DWB: 'http://120.76.246.190:9112/',
  // DCB: 'http://120.76.246.190:9091/',
  // QUOTATION: 'http://120.76.246.190:9001/',
  // DWB_ASSET: 'http://120.77.22.48:9510/',
};

// 交易相关字段
var DCB_BULLISH_LABEL = '订购';
var DCB_BEARISH_LABEL = '代售';

var DWB_BULLISH_LABEL = '订购';
var DWB_BEARISH_LABEL = '代售';

// 点微宝止损止盈点配置(0默认为100%)
var RANGE_LIST = [0, 0.1, 0.2, 0.3, 0.4, 0.5];

// H5单页调用

//  充值
var PAY_TITLE = '充值';
// var PAY_URL = 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html';

//  提现
var WITHDRAW_TITLE = '提现';
// var WITHDRAW_URL = 'http://www.baidu.com';

var CRJ = '出入金';

//  点差宝介绍
var DCB_SUGGEST_TITLE = '点差宝介绍';
var DCB_SUGGEST_URL = '/static/intro/intro.html';

//  点微宝介绍
var DWB_SUGGEST_TITLE = '点微宝介绍';
var DWB_SUGGEST_URL = '/static/intro/intro.html';

//规则内嵌页面地址
var HTML_PAGE = {
  DCB: 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html',
  DWB: 'http://www.baidu.com',
};

var BROKER_URL = 'http://192.168.0.71:9000';

var repeatTime = {
  userInfo: 60000, // 轮询资产数据
  getQuot: 30000, // 轮询个股信息
  fs: 30000, // 轮询分时图
  kx: 60000, // 轮询K线图
};
