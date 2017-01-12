/**
 * Created by Amg on 2016/12/27.
 */
import { SYS_DCB, SYS_DWB } from '../define';

const AjaxConfig = {
  [SYS_DCB]: {
    // home
    getUseData: { mobile: 'mobile', orgId: 'orgId' },
    getMerchsAndServers: { mobile: 'mobile', orgId: 'orgId' },
    getTradeRecordPage: {
      mobile: 'mobile',
      orgId: 'orgId',
      lastId: 'lastId',
      pageSize: 'pageSize',
    },
    createUserOrder: {
      sessionId: 'sessionId',
      margin: 'margin',
      marketId: 'marketId',
      symbolId: 'symbolId',
      direction: 'direction',
      volume: 'volume',
      point: 'point',
    },
    updateUser: {
      nickName: 'nickName',
      headImgUrl: 'headImgUrl',
      orgId: 'orgId',
      mobile: 'mobile',
    },
  },
  [SYS_DWB]: {
    // home
    getUseData: { sessionId: 'sessionId' },
    getMerchsAndServers: { sessionId: 'sessionId' },
    getTradeRecordPage: {
      sessionId: 'sessionId',
      lastId: 'lastId',
      pageSize: 'pageSize',
    },
    createUserOrder: {
      sessionId: 'sessionId',
      bsType: 'bsType',
      stopWin: 'stopWin',
      stopLoss: 'stopLoss',
      marketId: 'marketId',
      symbolId: 'symbolId',
      direction: 'direction',
      volume: 'volume',
    },
    updateUser: {
      nickName: 'nickName',
      headImgUrl: 'headImgUrl',
      orgId: 'orgId',
      mobile: 'mobile',
      sessionId: 'sessionId',
    },
  },
};

export default AjaxConfig;
