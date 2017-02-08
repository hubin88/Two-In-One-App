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

export const MOUNT_UNIT_BU = 10;

export const MOUNT_UNIT_OTHERS = 1;

export const MOUNT_SCALE = 0.1;

export const ASSET_SCALE = 0.1;


export const ORG_ID = {
  [SYS_DCB]: 118,
  [SYS_DWB]: 81,
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
  assetId: 0,
  price: 1,
  high: 2,
  low: 3,
  open: 4,
  preclose: 5,
};
