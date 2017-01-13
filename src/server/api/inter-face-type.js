/**
 * Created by Amg on 2016/12/28.
 */

import { SYS_DCB, SYS_DWB } from '../define';

/* ===== 接口名称（前缀） ===== */
// 交易前缀
export const TRADE_DIR = {
  [SYS_DCB]: 'trade/',
  [SYS_DWB]: 'weipan/',
  DCB: 'trade/',
  DWB: 'weipan/',
};

// 经纪人前缀

/* ===== 接口名称（后缀） ===== */

// 用户注册
export const REG = 'register';

// 用户登录
export const LOGIN = 'login';

// 用户退出登录
export const LOGOUT = 'logout';

// 获取交易所列表
export const GET_EXCHANGE_LIST = 'getExchangeList';

// 获取单个交易所数据
export const GET_ONE_EXCHANGE_INFO = 'getOneExchangeInfo';

// 获取系统配置
export const GET_SYS_CONFIG = 'getSysconfig';

// 获取用户数据
export const GET_USER_DATA = 'getUseData';

// 获取商品、服务器信息
export const GET_MERCHS_AND_SERVERS = 'getMerchsAndServers';

// 忘记密码
export const FORGET_PWD = 'forgetPwd';

// 发送验证码
export const GET_CODE = {
  DCB: 'sendCaptcha',
  DWB: 'sendCodeRegister',
};

// 设置、修改交易密码
export const UPADTE_PWD = 'upadtePwd';

// 修改手机号
export const UPDATE_MOBILE = 'updateMobile';

// 下单、建仓
export const CREATE_USER_ORDER = 'createUserOrder';

// 查询用户信息
export const GET_USERS = 'getUsers';

// 查询机构信息
export const GET_ORGS = 'getOrgs';

// 修改用户
export const UPDATE_USER = 'updateUser';

// 查询用户
export const FIND_USER = 'findUser';

// 系统设置是否注册，版本升级
export const QUERY_REGISTINFO = 'queryRegistInfo';

// 查询交易所会员机构
export const GET_MEMBER_LIST = 'getMemberList';

// 获取交易记录
export const GET_TRADE_RECORD = {
  [SYS_DCB]: 'getTradeRecordPage',
  [SYS_DWB]: 'getTradeHoldHisPage',
};

// 资产推送
export const QUERY_USER_INFO_GATEWAY = 'QueryUserInfoGateway.jsp';

// 获取交易日，交易时间
export const QUERY_NORMAL_DAY = 'lineinfo_api/query_normalday';

// 获取分时K线
export const QUERY_TIME_SHARE = 'lineinfo_api/query_timeshare';

// 获取分钟K线
export const QUERY_MINUTE_LINE = 'lineinfo_api/query_minuteline';

// 获取日K线,周K,月K线
export const QUERY_DAY_LINE = 'lineinfo_api/query_dayline';

// 获取配置K线周期
export const QUEYR_PERIOD = 'lineinfo_api/query_period';

// 获取个股行情
export const GET_QUOT = 'mktinfo_api/get_quot';

// 订阅
export const SUBSCRIBE = 'mktinfo_api/subscribe';