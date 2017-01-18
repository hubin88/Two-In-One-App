/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';
import { toChangeCommodity } from '../../../model/action';
import { styleConfig } from '../../../server/app-config';
import { requestQueryTimeShare } from '../../../model/market/action-market';

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
  paddingLeft: 35,
  paddingBottom: 30,
  paddingTop: 30,
  timeCount: 5,
  vLineCount: 5,
  chartLineColor: 'rgba(2,100,30,1)',
  chartFillColor: 'rgba(2,100,30,.1)',
  chartColor: 'black',
};

const timeList = [
  { name: 'fenTime', label: '分时' },
  { name: 'oneMin', label: '1分' },
  { name: 'fiveMin', label: '5分' },
  { name: 'fifteenMin', label: '15分' },
  { name: 'thirtyMin', label: '30分' },
  { name: 'sixtyMin', label: '60分' },
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
    };
  }
  componentDidMount() {
    this.kLine = new window.DrawKLine('kLine', options);
    this.chart = new window.DrawChart('chart', chartOptions);
    setTimeout(() => {
      this.drawFS();
    }, 1000);
    // this.kLine.drawKLine(window.kLineData.result);
    // this.chart.drawChart(window.data2);
  }

  quotesName = ['昨收：', '今开：', '最高：', '最低：'];

  redrawCanvas({ w, h } = {
    w: styleConfig.screenW,
    h: styleConfig.canvasH - this.props.holdHeight,
  }) {
    this.kLine.resetCanvas(w, h);
  }

  drawFS = (id) => {
    const { dispatch, normalday, commodityId } = this.props;
    const paramsId = id || commodityId;
    normalday.assetinfo.forEach((item) => {
      if (item.assetid === paramsId) {
        const obj = {
          assetid: paramsId,
          timevalue1: item.opentime,
          timetype: 1,
          timevalue2: item.closetime,
          // minutetype: 'fifteenMinute',
        };
        dispatch(requestQueryTimeShare(obj, this));
        // dispatch(requestQueryMinuteLine(obj, this));
      }
    });
  }

  chooseCommodity = (id) => () => {
    const { dispatch } = this.props;
    this.drawFS(id);
    // const { dispatch, normalday } = this.props;
    // normalday.assetinfo.forEach((item) => {
    //   if (item.assetid === id) {
    //     const obj = {
    //       assetid: id,
    //       timevalue1: item.opentime,
    //       timetype: 1,
    //       timevalue2: item.closetime,
    //       // minutetype: 'fifteenMinute',
    //     };
    //     dispatch(requestQueryTimeShare(obj, this));
    //     // dispatch(requestQueryMinuteLine(obj, this));
    //   }
    // });
    dispatch(toChangeCommodity(id));
  };

  selectTime = (e) => {
    const value = e.currentTarget.getElementsByTagName('span')[0];
    const len = this.timeList.children.length;
    // ;
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
  }

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
          <div style={{ height: canvasH, display: 'none' }}>
            <canvas id="kLine" />
          </div>
          <div style={{ height: canvasH }}>
            <canvas id="chart" />
          </div>
        </div>
        <div style={{ height: 2 * styleConfig.quotesTipsH }}>
          <ul styleName="timeList" ref={(ref) => { this.timeList = ref; }}>
            {
              this.timeList.map((time, i) => (
                <li
                  key={i}
                  onClick={this.selectTime}
                ><span>{time.label}</span></li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const { commodityData, commodityPrices } = this.props;
    return (
      <div styleName="quotes">
        <ul styleName="commodity" style={{ height: styleConfig.commodityH }}>
          {
            Object.keys(commodityData).map((i) => {
              const name = commodityData[i].Name;
              let prices = 0;
              commodityPrices.forEach((item) => {
                if (item[0] === i) {
                  prices = item[2];
                }
              });
              return (
                <li
                  key={i}
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
