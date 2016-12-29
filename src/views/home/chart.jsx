/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './chart.scss';

class Chart extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    chartHeight: PropTypes.string,
  }

  quotations = [
    { name: '白银', value: '4380' },
    { name: '刚玉', value: '3342' },
    { name: '塑料', value: '1335' },
  ]

  choose = () => {}

  renderQuotations() {
    return (
      <div styleName="commodity-quotations">
        <ul>
          {this.quotations.map((quotations, index) =>
            <li key={index} onClick={this.choose()}>
              <div styleName="quotations-info">
                <span>{quotations.name}</span>
                <span>{quotations.value}</span>
              </div>
              <div>
                <img src="" alt="" />
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }

  renderChart() {
    return (
      <div styleName="trend-chart">走势图</div>
    );
  }

  render() {
    const chartHeight = this.props.chartHeight;
    return (
      <div styleName="chart" style={{ height: `${chartHeight}` }}>
        <hr styleName="line" />
        {this.renderQuotations()}
        {this.renderChart()}
      </div>
    );
  }
}

export default cssModules(Chart, styles, { allowMultiple: true, errorWhenNotFound: false });
