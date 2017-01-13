/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';

class Quotes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commodityData: PropTypes.object.isRequired,
    commodityPrices: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      commoditySelected: 0,
    };
  }

  componentDidMount() {
    const options = {
      lineWidth: 1,
      barWidth: 4,
      spaceWidth: 5,
      paddingWidth: 40,
      horizontalLineCount: 5,
      verticalLineCount: 5,
      timeType: 1,
    };
    const d = new window.DrawKLine('kLine', options);
    d.drawKLine(window.kLineData.result);

    // var dc = new DrawChart('drawChart', {
    //   paddingLeft: 35,
    //   paddingBottom: 30,
    //   paddingTop: 30,
    //   timeCount: 5,
    //   vLineCount: 5,
    //   chartLineColor: 'rgba(2,100,30,1)',
    //   chartFillColor: 'rgba(2,100,30,.1)',
    //   chartColor: 'black',
    // });
    //
    // dc.drawChart(data2);
  }
  chooseCommodity = () => {};

  renderChart() {
    return (
      <div styleName="trend-chart">
        <div styleName="chart-header">今开等数据</div>
        <div styleName="canvas">
          <canvas id="kLine" />
        </div>
      </div>
    );
  }


  render() {
    const { commodityData, commodityPrices } = this.props;
    console.log(commodityData);
    return (
      <div styleName="quotes">
        <ul styleName="commodity">
          {
            Object.keys(commodityData).map((i, idx) => {
              const name = commodityData[i].Name;
              const prices = (commodityPrices[i] && commodityPrices[i].value) ?
                commodityPrices[i].value : '--';
              return (
                <li
                  key={i}
                  styleName={`${this.state.commoditySelected === idx ? 'active' : ''}`}
                  onClick={this.chooseCommodity()}
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
