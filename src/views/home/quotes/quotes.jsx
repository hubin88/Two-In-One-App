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

const options = {
  lineWidth: 1,
  barWidth: 4,
  spaceWidth: 5,
  paddingWidth: 40,
  horizontalLineCount: 5,
  verticalLineCount: 5,
  timeType: 1,
};
const chartOptions = {
  // paddingLeft: 35,
  // paddingBottom: 30,
  // paddingTop: 30,
  timeCount: 5,
  vLineCount: 5,
  chartLineColor: 'rgba(2,100,30,1)',
  chartFillColor: 'rgba(2,100,30,.1)',
  chartColor: 'black',
};
const timeList = [
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
  };
  constructor(props) {
    super(props);
    this.state = {
      commoditySelected: 0,
      isDraw: true,
    };
    this.timeName = 'fenTime';
  }
  componentDidMount() {
    this.kLine = new window.DrawKLine('kLine', options);
    this.chart = new window.DrawChart('chart', chartOptions);
    // setTimeout(() => {
    //   this.drawFS();
    // }, 5000);
    this.time = setInterval(() => {
      this.drawFS();
    }, 60000);
    const selectDefault = this.timeList.children[0].getElementsByTagName('span')[0];
    selectDefault.style.cssText = 'color:#FF8212;border: 1px #ff8212 solid;padding: 2px; 0';
    // this.kLine.drawKLine(window.kLineData.result);
    // this.chart.drawChart(window.data2);
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }
  quotesName = ['昨收：', '今开：', '最高：', '最低：'];
  redrawCanvas(drawType = 'chart') {
    const w = styleConfig.screenW;
    const h = styleConfig.canvasH - this.props.holdHeight;
    this[drawType].resetCanvas({ width: w, height: h });
  }
  FScallBack = (dispatch, json) => {
    this.chart.drawChart(json.result);
    dispatch(successQueryTimeShare(json));
  };
  // 绘制分时图
  drawFS = (id) => {
    const { dispatch, normalday: { assetinfo }, commodityId } = this.props;
    console.log('commodityId', commodityId);
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
    // this.drawFS(id);
    // this.drawKX(id, name);
    dispatch(toChangeCommodity(id));
  };
  selectTime = (e, name) => {
    this.drawCanvas(name);
    const value = e.currentTarget.getElementsByTagName('span')[0];
    const len = this.timeList.children.length;
    for (let i = 0; i < len; i += 1) {
      this.timeList.childNodes[i].firstChild.style.cssText = '';
    }
    value.style.cssText = 'color:#FF8212;border: 1px #ff8212 solid;padding: 2px; 0';
  };
  quoteLi = () => {
    const { commodityId, commodityPrices } = this.props;
    const tpl = [];
    commodityPrices.forEach((item) => {
      if (commodityId === item[0]) {
        this.quotesName.forEach((itemName, idx) => {
          tpl.push(<li key={idx}>{itemName}{Number.parseInt([...item][idx + 2], 10)}</li>);
        });
      }
    });
    return tpl;
  };
  renderChart() {
    const canvasH = styleConfig.canvasH - this.props.holdHeight;
    this.timeList = timeList;
    return (
      <div
        styleName="trend-chart"
      >
        <div style={{ height: styleConfig.quotesTipsH }}>
          <ul styleName="quotesInfo">{this.quoteLi()}</ul>
        </div>
        <div>
          <div id="drawLine" style={{ height: canvasH, display: 'none' }}>
            <canvas id="kLine" />
          </div>
          <div id="drawChart" style={{ height: canvasH }}>
            <canvas id="chart" />
          </div>
        </div>
        <div style={{ height: 2 * styleConfig.quotesTipsH }}>
          <ul styleName="timeList" ref={(ref) => { this.timeList = ref; }}>
            {
              this.timeList.map((item, i) => (
                <li
                  key={i}
                  onClick={(e) => { this.selectTime(e, item.name); }}
                ><span>{item.label}</span></li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
  render() {
    const { commodityData, commodityPrices, normalday: { assetinfo } } = this.props;
    if (assetinfo && this.state.isDraw) {
      this.drawFS();
      this.state.isDraw = false;
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
                if (item[0] === i) {
                  prices = Number.parseInt(item[1], 10);
                }
              });
              return (
                <li
                  key={i}
                  style={{ width: liWidth }}
                  styleName={`${this.props.commodityId === i ? 'active' : ''}`}
                  onClick={this.chooseCommodity(i)}
                >
                  <img src="" alt="" />
                  <span>{name}</span>
                  <span>{prices}</span>
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
