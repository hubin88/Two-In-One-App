/**
 * Created by Amg on 2016/12/27.
 */
import { Cookie, ParamData } from '../ultils/tools';
import { SYS_DCB, SYS_DWB } from './define';

export default class AppConfig {

  static systemType = () => Cookie.getCookie('systemType');

  static exchangeData = () => Cookie.getCookie('exchangeData');

  static tradeLabel = () => ({
    [SYS_DCB]: { bullish: DCB_BULLISH_LABEL, bearish: DCB_BEARISH_LABEL },
    [SYS_DWB]: { bullish: DWB_BULLISH_LABEL, bearish: DWB_BEARISH_LABEL },
  });

  static isApp = ParamData.source === 'app';

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

const screenH = document.documentElement.clientHeight;
const screenW = document.documentElement.clientWidth;
const headerH = AppConfig.isApp ? 0 : 50;
const footerH = AppConfig.isApp ? 0 : 60;
const userInfoH = 70;
const buildingH = 60;
const tipsH = 20;
const holdH = 90;
const commodityH = 52;
const quotesH = screenH - headerH - footerH - userInfoH - buildingH - tipsH - commodityH;
const quotesTipsH = 20;
// const quotesStyle = () => {
//   const s = { h: 0, w: 0 };
//   const h = screenH - headerH - footerH - userInfoH - buildingH - tipsH;
//   const w = (screenW * 3) / 4;
//   if (h >= w) {
//     s.h = w;
//     s.w = screenW;
//   } else {
//     s.h = h;
//     s.w = (h * 4) / 3;
//   }
//   return s;
// };
// const quotesW = quotesStyle().w;
// const quotesH = quotesStyle().h;
const canvasH = quotesH - (3 * quotesTipsH);

export const styleConfig = {
  screenH,
  screenW,
  headerH,
  footerH,
  userInfoH,
  buildingH,
  tipsH,
  holdH,
  commodityH,
  quotesTipsH,
  canvasH,
};
