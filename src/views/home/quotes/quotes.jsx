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
import { PRICES } from '../../../server/define';
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
    commodityPrices: PropTypes.array.isRequired,
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
  }

  componentDidMount() {
    this.kLine = new window.DrawKLine('kLine', options);
    this.chart = new window.DrawChart('chart', chartOptions);
    this.timer();
  }

  componentWillUnmount() {
    if (this.time) clearInterval(this.time);
  }

  timer = () => {
    if (this.time) clearInterval(this.time);
    this.time = setInterval(() => {
      this.drawFS();
    }, 60000);
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
      }, 60000);
      document.getElementById('drawLine').style.display = 'none';
      document.getElementById('drawChart').style.display = 'block';
      this.redrawCanvas('chart');
    } else {
      const timeId = '';
      this.drawKX(timeId, name);
      this.time = setInterval(() => {
        this.drawKX(timeId, name);
      }, 60000);
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

  quoteLi = () => {
    const { commodityId, commodityPrices } = this.props;
    const tpl = [];
    commodityPrices.forEach((item) => {
      if (commodityId === item[PRICES.assetId[0]]) {
        this.quotesName.forEach((itemName, idx) => {
          tpl.push(<li key={idx}>{itemName}{Number.parseInt([...item][idx + 2], 10)}</li>);
        });
      }
    });
    return tpl;
  };

  showImage = (i, prices) => {
    let tpl = '';
    const commodityPricesOld = JSON.parse(Cookie.getCookie('commodityPrices'));
    if (commodityPricesOld) {
      commodityPricesOld.forEach((val) => {
        if (i === val[PRICES.assetId[0]] && prices >= Number.parseInt(val[PRICES.price[0]], 10)) {
          tpl = this.props.commodityId === i ?
            (<img
              src={require('../../../images/arrow_up_red@2x.png')} alt="up"
              styleName="showImg"
            />) :
            <img src={require('../../../images/arrow_up@2x.png')} alt="up" styleName="showImg" />;
        } else if (i === val[PRICES.assetId[0]] && prices < Number.parseInt(val[PRICES.price[0]], 10)) {
          tpl = this.props.commodityId === i ?
            (<img
              src={require('../../../images/arrow_down_green@2x.png')} alt="up"
              styleName="showImg"
            />) :
            <img src={require('../../../images/arrow_down@2x.png')} alt="up" styleName="showImg" />;
        }
      });
    } else {
      if (this.props.commodityId === i) {
        return (<img
          src={require('../../../images/arrow_up_red@2x.png')} alt="up"
          styleName="showImg"
        />);
      }
      return <img src={require('../../../images/arrow_up@2x.png')} alt="up" styleName="showImg" />;
    }
    return tpl;
  };

  renderChart() {
    const canvasH = styleConfig.canvasH - this.props.holdHeight;
    if (this.props.commodityPrices) Cookie.setCookie('commodityPrices', this.props.commodityPrices);
    return (
      <div
        styleName="trend-chart"
      >
        <div
          style={{ height: styleConfig.quotesTrendH, lineHeight: `${styleConfig.quotesTrendH}px` }}
        >
          <ul styleName="quotes-info">{this.quoteLi()}</ul>
        </div>
        <div styleName="draw-box">
          <div id="drawLine" style={{ height: canvasH - 8, display: 'none' }}>
            <canvas id="kLine" />
          </div>
          <div id="drawChart" style={{ height: canvasH - 8 }}>
            <canvas id="chart" />
          </div>
        </div>
        <div style={{ height: styleConfig.quotesTimeH + 8, paddingTop: 8 }}>
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
    const { commodityData, commodityPrices, normalday: { assetinfo }, systemType, commodityId } = this.props;
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
        <ul styleName="commodity" style={{ height: styleConfig.commodityH }}>
          {
            Object.keys(commodityData).map((i) => {
              const name = commodityData[i].Name;
              let prices = 0;
              commodityPrices.forEach((item) => {
                if (item[PRICES.assetId[0]] === i) {
                  prices = Number.parseInt(item[PRICES.price[0]], 10);
                }
              });
              return (
                <li
                  key={i}
                  style={{ width: liWidth }}
                  styleName={`${this.props.commodityId === i ? 'active-c' : ''}`}
                  onTouchTap={this.chooseCommodity(i)}
                >
                  <div>
                    <span>{name}</span>
                    <span>{prices}</span>
                  </div>
                  {
                    this.showImage(i, prices)
                  }
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
