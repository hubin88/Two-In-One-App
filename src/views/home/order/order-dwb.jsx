/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order.scss';

const rangeName = { lossIdx: '止损', profitIdx: '止盈' };

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OrderDWB extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    direction: PropTypes.string,
    commodity: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { commodity: { Margin: deposit } } = props;
    this.depositArr = deposit.split('|').map(r => r.split(','));
    this.rangeArr = RANGE_LIST;
    this.state = {
      depositIdx: 0,
      lossIdx: 0,
      profitIdx: 0,
    };
  }

  getSettingData = () => ({
    deposit: this.depositArr[this.state.depositIdx],
    loss: this.rangeArr[this.state.lossIdx],
    profit: this.rangeArr[this.state.profitIdx],
  });

  chooseSetting = (name, idx) => () => {
    this.setState({
      [name]: idx,
    });
  };

  render() {
    const { direction } = this.props;
    return (
      <div styleName={`order ${direction}`}>
        <div styleName="info">
          <span styleName="color-gray">
            购买<b styleName="color-red"><b>1</b>桶沥青</b>,
            市场价<span styleName="color-red"><b>338.8</b></span>元
          </span>
        </div>
        <div className="table" styleName="setting">
          <div className="tr" styleName="deposit">
            <div className="td" styleName="title-dwb less-height">
              <span styleName="color-gray">购买金额(元)</span>
            </div>
            <div className="td" styleName="content">
              {
                this.depositArr.map((item, index) =>
                  <div
                    styleName={`item ${this.state.depositIdx === index ? 'active' : ''}`}
                    key={index}
                    onClick={this.chooseSetting('depositIdx', index)}
                  >
                    {item[0]}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div styleName="info">
          <span styleName="color-gray">
            手续费<span styleName="color-red"><b>0.75</b>元</span>(手续费单边收取)
            <span styleName="color-red">波动一个点,盈亏<b>0.1</b>元</span>
          </span>
        </div>
        {
          Object.keys(rangeName).map((name) => (
            <div key={name} className="table" styleName="setting">
              <div className="tr" styleName="range">
                <div className="td" styleName="title-dwb">
                  <span styleName="color-gray">{rangeName[name]}:</span>
                </div>
                <div className="td" styleName="content">
                  {
                    this.rangeArr.map((item, index) =>
                      <div
                        styleName={`item item-line ${this.state[name] === index ? 'active' : ''}`}
                        key={`${name}-${index}`}
                        onClick={this.chooseSetting(name, index)}
                      >
                        {parseFloat(item) === 0 ? '无' : `${parseInt(item * 100, 10)}%`}
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          ))
        }
        <div styleName="prompt">
          <span styleName="color-gray">合理的止盈和止损,有利于锁定收益,降低风险</span>
        </div>
      </div>
    );
  }
}

export default OrderDWB;
