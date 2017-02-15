/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order.scss';
import Drag from '../../../components/drag/drag';

const minBuyNum = 1;
// const test = () => {
// return (
//   <input
//   type="range"
//   value={this.state.amountNum}
//   onChange={this.settingAmount()}
//   min={minBuyNum}
//   max={maxBuyNum}
//   step="1"
// />
// );
// };

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OrderDCB extends Component {
  static defaultProps = {
    defaultAmountNum: 1,
  };
  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.string,
    commodity: PropTypes.object,
    defaultAmountNum: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const { commodity: { Margin: deposit, Point: point } } = props;
    this.depositArr = deposit.split(',') || [];

    const arr = point.split('|');

    this.pointArr = arr.map(r => {
      const [float, fee] = r.split(',');
      return {
        float,
        fee,
      };
    });

    this.state = {
      depositIdx: 0,
      pointIdx: 0,
    };
  }

  getSettingData = () => ({
    commodityInfo: this.props.commodity,
    deposit: this.depositArr[this.state.depositIdx],
    point: this.pointArr[this.state.pointIdx],
    direction: this.props.direction,
    margin: { amount: this.drag.getNowNum() },
  });

  chooseDeposit = (idx) => () => {
    this.setState({
      depositIdx: idx,
    });
  };

  choosePoint = (idx) => () => {
    this.setState({
      pointIdx: idx,
    });
  };

  render() {
    const { direction, commodity: { MaxBuyNum }, defaultAmountNum } = this.props;
    const maxBuyNum = parseInt(MaxBuyNum, 10);
    const { depositIdx, pointIdx } = this.state;
    const profit = (this.depositArr[depositIdx] * (100 - this.pointArr[pointIdx].fee)) / 100;
    return (
      <div styleName={`order ${direction}`}>
        <div className="table" styleName="setting">
          <div className="tr" styleName="margin">
            <div className="td" styleName="title-dcb"><span>合约定金:</span></div>
            <div className="td" styleName="content">
              {
                this.depositArr.map((item, index) =>
                  <button
                    styleName={`item ${depositIdx === index ? 'active' : ''}`}
                    key={index}
                    onTouchTap={this.chooseDeposit(index)}
                  >
                    {item}
                  </button>
                )
              }
            </div>
          </div>
        </div>
        <div className="table" styleName="setting">

          <div className="tr" styleName="point">
            <div className="td" styleName="title-dcb">
              <span>止盈/止损点:</span>
            </div>
            <div className="td" styleName="content">
              {
                this.pointArr.map((item, index) =>
                  <button
                    styleName={`item ${pointIdx === index ? 'active' : ''}`}
                    key={index}
                    onTouchTap={this.choosePoint(index)}
                  >
                    {item.float}
                  </button>
                )
              }
            </div>
          </div>
        </div>
        <div className="table" styleName="setting">

          <div className="tr" styleName="amount">
            <div className="td" styleName="title-dcb">
              <span>数量:</span>
            </div>
            <div className="td" styleName="content">
              <div styleName="drag-box">
                <Drag
                  ref={(ref) => { this.drag = ref; }}
                  clsName={`drag-${direction}`}
                  minNum={minBuyNum}
                  maxNum={maxBuyNum}
                  defaultNum={defaultAmountNum}
                />
              </div>
            </div>
          </div>
        </div>
        <div styleName="prompt">
          <span styleName="except">有望盈利<b styleName="color-red">{profit}</b>元</span>
          <span styleName="color-gray">当前可下单最大数量{maxBuyNum}手</span>
        </div>
      </div>
    );
  }
}

export default OrderDCB;
