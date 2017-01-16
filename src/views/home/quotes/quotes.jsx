/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';
import { toChangeCommodity } from '../../../model/action';

class Quotes extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commodityData: PropTypes.object.isRequired,
    commodityPrices: PropTypes.object.isRequired,
    commodityId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      commoditySelected: 0,
    };
  }

  componentDidMount() {
    // const options = {
    //   lineWidth: .5,
    //   barWidth: 3,
    //   spaceWidth: 3,
    //   paddingWidth: 40,
    //   horizontalLineCount: 5,
    //   verticalLineCount: 5,
    //   timeType: 1,
    // };
    // setTimeout(function () {
    //   const d = new window.DrawKLine('kLine', options);
    //   d.drawKLine(window.kLineData.result);
    // },500)


    const dc = new window.DrawChart('kLine', {
      paddingLeft: 35,
      paddingBottom: 30,
      paddingTop: 30,
      timeCount: 5,
      vLineCount: 5,
      chartLineColor: 'rgba(2,100,30,1)',
      chartFillColor: 'rgba(2,100,30,.1)',
      chartColor: 'black',
    });

    dc.drawChart(window.data2);
  }

  chooseCommodity = (id) => () => {
    this.props.dispatch(toChangeCommodity(id));
  };

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
    return (
      <div styleName="quotes">
        <ul styleName="commodity">
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
