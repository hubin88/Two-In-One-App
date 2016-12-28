import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import Hold from '../../components/hold/hold';
import styles from './home.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      quotations: [
        { name: '白银', value: '4380' },
        { name: '刚玉', value: '3342' },
        { name: '塑料', value: '1335' },
      ],
      hold: false,
    };
  }

  haveHold = () => {
    if (this.state.hold) {
      this.setState({ hold: false });
      return;
    }
    this.setState({ hold: true });
    return;
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
          {this.state.quotations.map((quotations, index) =>
            <li key={index}>
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
    const haveHold = `${this.state.hold ? 'haveHold' : 'noHaveHold'}`;
    return (
      <div styleName={`trend-chart ${haveHold}`}>走势图</div>
    );
  }

  renderBuildingButton() {
    return (
      <div styleName="building-button">
        <img src="" alt="" />
        <span styleName="bullish" onClick={this.haveHold}>看涨</span>
        <span styleName="bearish">看跌</span>
      </div>
    );
  }

  renderHold() {
    if (this.state.hold) {
      return (
        <Hold stylename />
      );
    }
    return null;
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
        {this.renderHold()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Home);

