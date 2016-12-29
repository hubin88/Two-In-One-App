/**
 * Created by Amg on 2016/12/27.
 */


const AjaxConfig = {
  DCB: {
    getSysConfig: null,
    getUserData: { sessionId: 'userID' },
  },
  DWB: {
    getSysConfig: null,
    getUserData: { openId: 'userID' },
  },
};
export default AjaxConfig;
