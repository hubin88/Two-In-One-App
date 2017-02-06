/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order.scss';
@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OrderDCB extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.string,
    commodity: PropTypes.object,
  };

  constructor(props) {
    super(props);
    console.log(props);
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
    const { direction, commodity: { MaxBuyNum: maxBuyNum } } = this.props;
    return (
      <div styleName={`order ${direction}`}>
        <div className="table" styleName="setting">
          <div className="tr" styleName="deposit">
            <div className="td" styleName="title-dcb"><span>合约定金:</span></div>
            <div className="td" styleName="content">
              {
                this.depositArr.map((item, index) =>
                  <button
                    styleName={`item ${this.state.depositIdx === index ? 'active' : ''}`}
                    key={index}
                    onClick={this.chooseDeposit(index)}
                  >
                    {item}
                  </button>
                )
              }
            </div>
          </div>
          <div className="tr" styleName="range">
            <div className="td" styleName="title-dcb">
              <span styleName="color-gray">止盈/止损点:</span>
            </div>
            <div className="td" styleName="content">
              {
                this.rangeArr.map((item, index) =>
                  <button
                    styleName={`item ${this.state.rangeIdx === index ? 'active' : ''}`}
                    key={index}
                    onClick={this.chooseRange(index)}
                  >
                    {item[0]}
                  </button>
                )
              }
            </div>
          </div>
          <div className="tr" styleName="amount">
            <div className="td" styleName="title-dcb">
              <span styleName="color-gray">数量:</span>
            </div>
            <div className="td" styleName="content"><span>拖动条</span></div>
          </div>
        </div>
        <div styleName="prompt">
          <span styleName="except">有望盈利<b styleName="color-red">{this.profit()}</b>元</span>
          <span styleName="color-gray">当前可下单最大数量{maxBuyNum}手</span>
        </div>
      </div>
    );
  }
}

export default OrderDCB;
