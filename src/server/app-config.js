/**
 * Created by Amg on 2016/12/27.
 */
import { Cookie, ParamData } from '../ultils/tools';
import { SYS_DCB, SYS_DWB } from './define';

export default class AppConfig {

  static systemType = () => Cookie.getCookie('systemType');

  static userData = () => JSON.parse(Cookie.getCookie(`${AppConfig.systemType()}-userData`)) || {};

  static exchangeData = () => Cookie.getCookie('exchangeData');

  static tradeLabel = () => ({
    [SYS_DCB]: { bullish: DCB_BULLISH_LABEL, bearish: DCB_BEARISH_LABEL },
    [SYS_DWB]: { bullish: DWB_BULLISH_LABEL, bearish: DWB_BEARISH_LABEL },
  });

  static isApp = ParamData.source === 'app';

  static singleHtml = () => ({
    pay: {
      title: PAY_TITLE, url: '', backDirect: '',
    },
    withdraw: {
      title: WITHDRAW_TITLE, url: '', backDirect: '',
    },
    dcbPage: {
      title: DCB_SUGGEST_TITLE, url: DCB_SUGGEST_URL, backDirect: '/user',
    },
    dwbPage: {
      title: DWB_SUGGEST_TITLE, url: DWB_SUGGEST_URL, backDirect: '/user',
    },
    gold: {
      title: CRJ, url: '', backDirect: '',
    },
  });

  static userChannel = () => ({
    rule: { title: '交易规则' },
    dcbPage: { title: '点差宝介绍' },
    dwbPage: { title: '点微宝介绍' },
    hold: { title: '当前持仓' },
    gold: { title: '出入金记录' },
    userSet: { title: '用户设置' },
    track: { title: '交易记录' },
  });
}

const screenH = document.documentElement.clientHeight;
const screenW = document.documentElement.clientWidth;
const headerH = AppConfig.isApp ? 0 : 66;
const footerH = AppConfig.isApp ? 0 : 50;
const userInfoH = 65;
const buildingH = 60;
const buildingP = 10;
const tipsH = 20;
const holdHeaderH = 30;
const holdBaseH = holdHeaderH;
const commodityP = 7;
const commodityH = 55 + commodityP;
const canvasPaddingBottom = 8;
const quotesH = screenH - headerH - footerH - userInfoH - buildingH - tipsH - commodityH;
const quotesTrendH = 25;
const quotesTimeH = 40 + canvasPaddingBottom;
const canvasH = quotesH - quotesTimeH - quotesTrendH;

export const styleConfig = {
  screenH,
  screenW,
  headerH,
  footerH,
  userInfoH,
  buildingH,
  buildingP,
  tipsH,
  holdHeaderH,
  holdBaseH,
  commodityP,
  commodityH,
  quotesTimeH,
  quotesTrendH,
  canvasPaddingBottom,
  canvasH,
};
