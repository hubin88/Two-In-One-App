/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order-dcb.scss';
@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OrderDCB extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.string,
    commodity: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { commodity: { Margin: deposit, Point: range } } = props;
    this.depositArr = deposit.split(',') || [];
    this.rangeArr = range.split('|').map(r => r.split(','));
    this.state = {
      depositIdx: 0,
      rangeIdx: 0,
    };
  }

  getSettingData = () => ({
    deposit: this.depositArr[this.state.depositIdx],
    range: this.rangeArr[this.state.rangeIdx],
  });

  chooseDeposit = (idx) => () => {
    this.setState({
      depositIdx: idx,
    });
  };

  chooseRange = (idx) => () => {
    this.setState({
      rangeIdx: idx,
    });
  };

  // 计算利润
  profit() {
    return 1000;
  }

  render() {
    console.log(this.props);
    const { direction, commodity: { MaxBuyNum: maxBuyNum } } = this.props;
    return (
      <div styleName={`order ${direction}`}>
        <div className="table" styleName="setting">
          <div className="tr" styleName="deposit">
            <div className="td" styleName="title"><span>合约定金:</span></div>
            <div className="td" styleName="content">
              {
                this.depositArr.map((item, index) =>
                  <div
                    styleName={`item ${this.state.depositIdx === index ? 'active' : ''}`}
                    key={index}
                    value={index}
                    onClick={this.chooseDeposit(index)}
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
                this.rangeArr.map((item, index) =>
                  <div
                    styleName={`item ${this.state.rangeIdx === index ? 'active' : ''}`}
                    key={index}
                    value={index}
                    onClick={this.chooseRange(index)}
                  >
                    {item[0]}
                  </div>
                )
              }
            </div>
          </div>
          <div className="tr" styleName="amount">
            <div className="td" styleName="title">数量:</div>
            <div className="td" styleName="content"><span>拖动条</span></div>
          </div>
        </div>
        <div styleName="prompt">
          <span styleName="except">有望盈利<b>{this.profit()}</b>元</span>
          <span styleName="tips">当前可下单最大数量{maxBuyNum}手</span>
        </div>
      </div>
    );
  }
}

export default OrderDCB;
