/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';
import { toChangeCommodity } from '../../../model/action';
import { styleConfig } from '../../../server/app-config';

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

class Quotes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commodityData: PropTypes.object.isRequired,
    commodityPrices: PropTypes.object.isRequired,
    commodityId: PropTypes.string,
    holdHeight: PropTypes.number,
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
    this.kLine.drawKLine(window.kLineData.result);
    // this.chart.drawChart(window.data2);
  }

  redrawCanvas({ w, h } = {
    w: styleConfig.screenW,
    h: styleConfig.canvasH - this.props.holdHeight,
  }) {
    this.kLine.resetCanvas(w, h);
  }

  chooseCommodity = (id) => () => {
    this.props.dispatch(toChangeCommodity(id));
  };

  renderChart() {
    const canvasH = styleConfig.canvasH - this.props.holdHeight;
    return (
      <div
        styleName="trend-chart"
      >
        <div style={{ height: styleConfig.quotesTipsH }}>
          今开等数据
        </div>
        <div style={{ height: canvasH }}>
          <canvas id="kLine" />
          <div style={{ display: 'none' }}>
            <canvas id="chart" />
          </div>
        </div>
        <div style={{ height: 2 * styleConfig.quotesTipsH }}>
          图形导航
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
              const prices = (commodityPrices[i] && commodityPrices[i].value) ?
                commodityPrices[i].value : '--';
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
