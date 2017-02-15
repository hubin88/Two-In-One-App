/**
 * Created by Amg on 2017/1/9.
 */

export const IS_IOS = 'ios';

export const IS_ANDROID = 'android';

export const IS_WINDOWS_PHONE = 'windowsPhone';

export const IS_UN_KNOW_PHONE = 'unKnow';

export const SYS_DCB = 'DCB';

export const SYS_DWB = 'DWB';

export const NONE = -1;

export const COMMODITY_BU = 'BU';

export const AMOUNT_UNIT_BU = 10;

export const AMOUNT_UNIT_OTHERS = 1;

export const AMOUNT_SCALE = 0.1;

export const ASSET_SCALE = 0.1;

export const ORG_ID = {
  [SYS_DCB]: 118,
  // [SYS_DWB]: 81,
  [SYS_DWB]: 80,
};

export const DIRECTS = {
  pay: 'ZF',
  withdraw: 'TX',
  gold: 'CRJ',
};

export const STATUS = {
  fetching: 0,
  success: 1,
  error: -1,
};

export const PRICES = {
  assetId: { sort: 0, key: 0, name: 'ID' },
  price: { sort: 1, key: 2, name: '现价' },
  preClose: { sort: 2, key: 6, name: '昨收' },
  open: { sort: 3, key: 5, name: '今开' },
  high: { sort: 4, key: 3, name: '最高' },
  low: { sort: 5, key: 4, name: '最低' },
  changePct: { sort: 6, key: 10, name: '涨跌幅' },
};

export const PRICES_LIST = ['preClose', 'open', 'high', 'low'];
