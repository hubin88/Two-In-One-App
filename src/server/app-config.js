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
  })

}
