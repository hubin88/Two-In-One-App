/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order-dcb.scss';

class OrderDCB extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.string,
    commodityData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      subscription: ['100', '300', '500', '700'],
      currentSubscription: 0,
      dcbPoint: ['3', '5', '7'],
      currentDcbPoint: 0,
      monetary: ['100', '300', '500', '700', '1000', '2000'],
      currentMonetary: 0,
      dwbPoint: ['无', '10%', '20%', '30%', '40%', '50%'],
      currentDwbProfit: 0,
      currentDwbLoss: 0,
    };
  }

  chooseSubscription = (e) => {
    this.setState({ currentSubscription: e.target.value });
  };
  chooseDcbPoint = (e) => {
    this.setState({ currentDcbPoint: e.target.value });
  };
  chooseMonetary = (e) => {
    this.setState({ currentMonetary: e.target.value });
  };
  chooseDwbProfit = (e) => {
    this.setState({ currentDwbProfit: e.target.value });
  };
  chooseDwbLoss = (e) => {
    this.setState({ currentDwbLoss: e.target.value });
  };

  chooseDeposit = () => {

  };

  // 计算利润
  profit() {
    return 1000;
  }

  // 计算最大下单数
  maxOrderAmount() {
    return 5;
  }

  render() {
    console.log(this.props.commodityData);
    return (
      <div className="table" styleName={`setting ${this.props.direction}`}>
        <div className="tr" styleName="deposit">
          <div className="td" styleName="title"><span>合约定金:</span></div>
          <div className="td" styleName="content">
            {
              this.state.subscription.map((item, index) =>
                <div
                  styleName={`item ${this.props.direction}`}
                  key={index}
                  value={index}
                  onClick={this.chooseDeposit}
                >
                  {item}
                </div>
              )
            }
          </div>
        </div>
        <div className="tr" styleName="range">
          <div className="td" styleName="title"><span>止盈/止损点:</span></div>
          <div className="td" styleName="content">
            {
              this.state.dcbPoint.map((item, index) =>
                <div
                  styleName={`item ${this.props.direction}`}
                  key={index}
                  value={index}
                  onClick={this.chooseDcbPoint}
                >
                  {item}
                </div>
              )
            }
          </div>
        </div>
        <div className="tr" styleName="amount">
          <div className="td" styleName="title">数量:</div>
          <div className="td" styleName="content"><span>拖动条</span></div>
        </div>
        <div styleName="dcb-profit-tip">
          <div>
            有望盈利:<span styleName={this.props.direction}>{this.profit()}</span>元
            <span styleName="dcb-amount-tip">当前可下单最大数量{this.maxOrderAmount()}手</span>
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(OrderDCB, styles, { allowMultiple: true, errorWhenNotFound: false });
