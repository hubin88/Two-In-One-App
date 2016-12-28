import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './home.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Home extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      quotations: [
        { name: '白银', value: '4380' },
        { name: '刚玉', value: '3342' },
        { name: '塑料', value: '1335' },
      ],
    };
  }

  renderProperty() {
    return (
      <div styleName="user-property">
        <img src={require('../../images/touxiang.jpg')} alt="" />
        <span styleName="property">总资产<b styleName="money">68.50</b>元</span>
        <div styleName="button">
          <img src="" alt="" />
          <span styleName="Recharge">充值</span>
          <span styleName="withdraw">提现</span>
        </div>
      </div>
    );
  }

  renderQuotations() {
    return (
      <div styleName="commodity-quotations">
        <ul>
          {this.state.quotations.map((quotations) =>
            <li>
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

  renderBuildingButton() {
    return (
      <div styleName="building-button">
        <img src="" alt="" />
        <span styleName="bullish">看涨</span>
        <span styleName="bearish">看跌</span>
      </div>
    );
  }


  render() {
    return (
      <div styleName="home">
        {this.renderProperty()}
        {this.renderQuotations()}
        {this.renderChart()}
        {this.renderBuildingButton()}
        <div styleName="exchange-hour">
          <img src="" alt="" />
          <span>交易时间:周一至周五08:00-次日04:00 每日04:30-07:00休市结算</span>
        </div>
      </div>
    );
  }
}

