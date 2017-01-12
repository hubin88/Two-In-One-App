/**
 * Created by Amg on 2016/12/27.
 */
import { Cookie } from '../ultils/tools';
import { SYS_DCB, SYS_DWB } from './define';

export default class AppConfig {

  static systemType = () => Cookie.getCookie('systemType');

  static exchangeData = () => Cookie.getCookie('exchangeData');

  static tradeLabel = () => ({
    [SYS_DCB]: { bullish: DCB_BULLISH_LABEL, bearish: DCB_BEARISH_LABEL },
    [SYS_DWB]: { bullish: DWB_BULLISH_LABEL, bearish: DWB_BEARISH_LABEL },
  });

  static singleHtml = () => ({
    pay: {
      title: PAY_TITLE, url: PAY_URL,
    },
    withdraw: {
      title: WITHDRAW_TITLE, url: WITHDRAW_URL,
    },
    dcbPage: {
      title: DCB_SUGGEST_TITLE, url: DCB_SUGGEST_URL,
    },
    dwbPage: {
      title: DWB_SUGGEST_TITLE, url: DWB_SUGGEST_URL,
    },
  });
}
