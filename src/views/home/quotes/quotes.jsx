import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';
import { toChangeCommodity } from '../../../model/action';
import { styleConfig } from '../../../server/app-config';
import {
  requestQueryTimeShare,
  requestQueryMinuteLine,
  requestQueryDayLine,
  successQueryDayLine,
  successQueryTimeShare,
} from '../../../model/market/action-market';
import { PRICES, PRICES_LIST } from '../../../server/define';
import { Cookie } from '../../../ultils/tools';

const options = {
  lineWidth: 1,
  barWidth: 4,
  spaceWidth: 5,
  horizontalLineCount: 5,
  verticalLineCount: 5,
  timeType: 1,
  backgroundColor: '#fff',
};
const chartOptions = {
  // paddingLeft: 35,
  // paddingBottom: 30,
  // paddingTop: 30,
  timeCount: 5,
  vLineCount: 5,
  chartLineColor: '#96c7e8',
  chartFillColor: '#afdbfc',
  chartColor: 'black',
  backgroundColor: 'transparent',
};
const drawList = [
  { name: 'fenTime', label: '分时' },
  { name: 'oneMinute', label: '1分' },
  { name: 'fiveMinute', label: '5分' },
  { name: 'fifteenMinute', label: '15分' },
  { name: 'thirtyMinute', label: '30分' },
  { name: 'sixtyMinute', label: '60分' },
  { name: 'oneK', label: '日K' },
  { name: 'weekK', label: '周K' },
  { name: 'monthK', label: '月K' },
];

class Quotes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commodityData: PropTypes.object.isRequired,
    commodityPricesOld: PropTypes.object.isRequired,
    commodityPrices: PropTypes.object.isRequired,
    commodityId: PropTypes.string,
    holdHeight: PropTypes.number,
    normalday: PropTypes.object,
    timeLists: PropTypes.array,
    systemType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      commoditySelected: 0,
      drawIdx: 0,
      // isDraw: true,
    };
    this.timeName = 'fenTime';
    this.isDraw = true;
    this.needRedraw = true;
  }

  componentDidMount() {
    this.kLine = new window.DrawKLine('kLine', options);
    this.chart = new window.DrawChart('chart', chartOptions);
    this.timer();
  }

  componentWillReceiveProps(nextProps) {
    const { holdHeight } = nextProps;
    if (holdHeight !== this.props.holdHeight) {
      this.reStart();
      this.needRedraw = true;
    } else if (this.needRedraw && holdHeight === this.props.holdHeight) {
      this.redrawCanvas();
      this.needRedraw = false;
    }
  }

  componentWillUnmount() {
    if (this.time) clearInterval(this.time);
  }

  timer = () => {
    if (this.time) clearInterval(this.time);
    this.time = setInterval(() => {
      this.drawFS();
    }, repeatTime.fs);
  };

  reStart = () => {
    this.isDraw = true;
    this.timer();
  };

  quotesName = ['昨收：', '今开：', '最高：', '最低：'];

  redrawCanvas = (drawType = 'chart') => {
    const w = styleConfig.screenW;
    const h = styleConfig.canvasH - this.props.holdHeight;
    this[drawType].resetCanvas({ width: w, height: h });
  };

  FScallBack = (dispatch, json) => {
    this.chart.drawChart(json.result);
    dispatch(successQueryTimeShare(json));
  };

  // 绘制分时图
  drawFS = (id) => {
    const { dispatch, normalday: { assetinfo }, commodityId } = this.props;
    const paramsId = id || commodityId;
    const info = assetinfo || [];
    info.forEach((item) => {
      if (item.assetid === paramsId) {
        const obj = {
          assetid: paramsId,
          timevalue1: item.opentime,
          timetype: 1,
          timevalue2: item.closetime,
        };
        dispatch(requestQueryTimeShare(obj, this.FScallBack));
      }
    });
  };

  KXFcallBack = (dispatch, json) => {
    this.kLine.drawKLine({ data: json.result, timeType: 1 });
    dispatch(successQueryDayLine(json));
  };

  KXRcallBack = (dispatch, json) => {
    this.kLine.drawKLine({ data: json.result, timeType: 2 });
    dispatch(successQueryDayLine(json));
  };

  drawKX = (id, name) => {
    const { dispatch, normalday: { assetinfo }, commodityId } = this.props;
    const paramsId = id || commodityId;
    assetinfo.forEach((item) => {
      if (item.assetid === paramsId) {
        const obj = {
          assetid: paramsId,
          timevalue1: item.opentime,
          timetype: 3,
          timevalue2: 100,
          minutetype: name,
        };
        if (name === 'oneK' || name === 'weekK' || name === 'monthK') {
          dispatch(requestQueryDayLine(obj, this.KXRcallBack));
        } else {
          dispatch(requestQueryMinuteLine(obj, this.KXFcallBack));
        }
      }
    });
  };

  // 切换分时与K线图
  drawCanvas = (name) => {
    this.timeName = name;
    clearInterval(this.time);
    if (name === 'fenTime') {
      this.drawFS();
      this.time = setInterval(() => {
        this.drawFS();
      }, repeatTime.fs);
      document.getElementById('drawLine').style.display = 'none';
      document.getElementById('drawChart').style.display = 'block';
      this.redrawCanvas('chart');
    } else {
      const timeId = '';
      this.drawKX(timeId, name);
      this.time = setInterval(() => {
        this.drawKX(timeId, name);
      }, repeatTime.kx);
      document.getElementById('drawLine').style.display = 'block';
      document.getElementById('drawChart').style.display = 'none';
      this.redrawCanvas('kLine');
    }
  };

  chooseCommodity = (id) => () => {
    const { dispatch } = this.props;
    if (this.timeName === 'fenTime') {
      this.drawFS(id);
    } else {
      this.drawKX(id, this.timeName);
    }
    dispatch(toChangeCommodity(id, this.redrawCanvas));
  };

  selectDraw = (name, idx) => {
    this.drawCanvas(name);
    this.setState({ drawIdx: idx });
  };

  renderPriceList = () => {
    const { commodityId, commodityPrices } = this.props;
    const nowCommodityData = commodityPrices[commodityId] || [];
    const tpl = nowCommodityData.length > 0 ? PRICES_LIST.map((pri) => (
      <li key={pri}>
        {PRICES[pri].name}：{Number.parseInt(nowCommodityData[PRICES[pri].sort], 10)}
      </li>
    )) : [];
    // console.log(nowCommodityData, nowCommodityData.length > 0, tpl);
    return tpl;
  };

  renderChart() {
    const canvasH = styleConfig.canvasH - this.props.holdHeight;
    return (
      <div
        styleName="trend-chart"
      >
        <div
          style={{ height: styleConfig.quotesTrendH, lineHeight: `${styleConfig.quotesTrendH}px` }}
        >
          <ul styleName="quotes-info">{this.renderPriceList()}</ul>
        </div>
        <div styleName="draw-box">
          <div id="drawLine" style={{ height: canvasH, display: 'none' }}>
            <canvas id="kLine" />
          </div>
          <div id="drawChart" style={{ height: canvasH }}>
            <canvas id="chart" />
          </div>
        </div>
        <div
          style={{ height: styleConfig.quotesTimeH, paddingTop: styleConfig.canvasPaddingBottom }}
        >
          <ul styleName="time-list">
            {
              drawList.map((item, i) => (
                <li
                  key={i}
                  onTouchTap={() => { this.selectDraw(item.name, i); }}
                >
                  <span styleName={this.state.drawIdx === i ? 'active-t' : ''}>
                    {item.label}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const {
      commodityData,
      commodityPrices,
      commodityPricesOld,
      normalday: { assetinfo },
      systemType,
      commodityId,
    } = this.props;

    if (Cookie.getCookie('sys') !== systemType) {
      this.reStart();
      Cookie.setCookie('sys', systemType);
    }
    if (assetinfo && this.isDraw && commodityId) {
      this.drawFS();
      this.isDraw = false;
    }
    let liNums = Object.keys(commodityData).length;
    if (liNums > 3) {
      liNums = 3;
    }
    const widths = 100;
    const liWidth = `${widths / liNums}%`;

    return (
      <div styleName="quotes">
        <ul
          styleName="commodity"
          style={{ height: styleConfig.commodityH, paddingTop: styleConfig.commodityP }}
        >
          {
            Object.keys(commodityData).map((id) => {
              const name = commodityData[id].Name;
              const nowPriceArr = commodityPrices[id] || [];
              const oldPriceArr = commodityPricesOld[id] || [];
              const nowPrice = Number.parseInt((nowPriceArr[PRICES.price.sort] || 0), 10);
              const oldPrice = Number.parseInt((oldPriceArr[PRICES.price.sort] || 0), 10);
              const commodityDirect = nowPrice >= oldPrice ? 'up' : 'down';
              const clsName = `${commodityId === id ? 'active' : 'inactive'}-${commodityDirect}`;

              return (
                <li
                  key={id}
                  style={{ width: liWidth }}
                  styleName={`${clsName}`}
                  onTouchTap={this.chooseCommodity(id)}
                >
                  <span styleName="commodity-info">
                    <b styleName="commodity-name">{name}</b><br />
                    <b styleName="commodity-prices">{nowPrice}</b>
                  </span>

                </li>
              );
            })
          }
        </ul>
        {this.renderChart()}
      </div>
    );
  }
}
export default cssModules(Quotes, styles, { allowMultiple: true, errorWhenNotFound: false });
