/**
 * Created by Amg on 2016/12/27.
 */


const AjaxConfig = {
  DCB: {
    register: null,
    getSysConfig: null,
    getUserData: { sessionId: 'userID' },
    getMerchsAndServers: null,
    forgetPwd: null,
    login: null,
    upadtePwd: null,
    updateMobile: null,
    createUserOrder: {
      sessionId: 'sessionId',
      margin: 'margin',
      marketId: 'marketId',
      symbolId: 'symbolId',
      direction: 'direction',
      volume: 'volume',
      point: 'point',
    },
    getUsers: null,
    getOrgs: null,
    updateUser: {
      nickName: 'nickName',
      headImgUrl: 'headImgUrl',
      orgId: 'orgId',
      mobile: 'mobile',
    },
    findUser: null,
    queryRegistInfo: null,
    getMemberList: null,
  },
  DWB: {
    register: null,
    getSysConfig: null,
    getUserData: { openId: 'userID' },
    getMerchsAndServers: null,
    forgetPwd: null,
    login: null,
    upadtePwd: null,
    updateMobile: null,
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
    getUsers: null,
    getOrgs: null,
    updateUser: {
      nickName: 'nickName',
      headImgUrl: 'headImgUrl',
      orgId: 'orgId',
      mobile: 'mobile',
      sessionId: 'sessionId',
    },
    findUser: null,
    queryRegistInfo: null,
    getMemberList: null,
  },
};

export default AjaxConfig;
