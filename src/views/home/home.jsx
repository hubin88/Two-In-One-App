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

  renderHome() {
    return (
      <div styleName="content">
        <div styleName="user-property">
          <img src={require('../../images/touxiang.jpg')} alt="" />
          <span styleName="property">总资产<b styleName="money">68.50</b>元</span>
          <div styleName="button">
            <span styleName="Recharge">充值</span>
            <span styleName="withdraw">提现</span>
          </div>
        </div>
        <div styleName="commodity-quotations">
          <ul>
            {this.state.quotations.map((quotations) =>
              <li>
                <div>
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
        <div styleName="trend-chart">走势图</div>
        <div styleName="building-button">下单按钮</div>
        <div styleName="exchange-hour">交易时间</div>
      </div>
    );
  }

  render() {
    return (
      <div styleName="home">
        {this.renderHome()}
      </div>
    );
  }
}

