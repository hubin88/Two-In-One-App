/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './quotes.scss';

const commodityInfo = [
  { name: '白银', value: '4380' },
  { name: '刚玉', value: '3342' },
  { name: '塑料', value: '1335' },
];
class Quotes extends Component {
  static defaultProps = {
    commodityInfo,
  };
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    commodityInfo: PropTypes.any,
  };

  choose = () => {}

  renderQuotations() {
    return (
      <div styleName="commodity-quotations">
        <ul>
          {this.props.commodityInfo.map((quotation, index) =>
            <li key={index} onClick={this.choose()}>
              <div styleName="quotations-info">
                <span>{quotation.name}</span>
                <span>{quotation.value}</span>
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
    return (
      <div styleName="chart">
        <hr styleName="line" />
        {this.renderQuotations()}
        {this.renderChart()}
      </div>
    );
  }
}

export default cssModules(Quotes, styles, { allowMultiple: true, errorWhenNotFound: false });
