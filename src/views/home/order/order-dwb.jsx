/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order.scss';
import {
  COMMODITY_BU, AMOUNT_UNIT_BU, AMOUNT_UNIT_OTHERS, ASSET_SCALE, AMOUNT_SCALE,
} from '../../../server/define';

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
    const {
      commodity: {
        Margin: margin,
        MerchCode: commodityCode,
        OpenFee: openFee,
      },
    } = props;
    // this.marginArr = margin.split('|').map(r => r.split(','));
    const arr = margin.split('|');
    const firstScale = arr[0].split(',')[0] * ASSET_SCALE;
    const feeBase = arr[0].split(',')[1] / firstScale;

    const amountScale = ASSET_SCALE * AMOUNT_SCALE;
    const amountUnit = commodityCode === COMMODITY_BU ? AMOUNT_UNIT_BU : AMOUNT_UNIT_OTHERS;

    this.marginArr = arr.map(r => {
      const [asset, float] = r.split(',');

      const amountNum = this.fmNum(asset * amountScale);
      const amount = this.fmNum(amountNum * amountUnit);

      const feeNum = float / feeBase;
      const fee = this.fmNum(openFee * feeNum);

      return {
        asset,
        float,
        fee,
        amountNum,
        amount,
      };
    });
    this.rangeArr = RANGE_LIST;
    this.state = {
      marginIdx: 0,
      lossIdx: 0,
      profitIdx: 0,
    };
  }

  getSettingData = () => ({
    commodityInfo: this.props.commodity,
    margin: this.marginArr[this.state.marginIdx],
    loss: this.rangeArr[this.state.lossIdx],
    profit: this.rangeArr[this.state.profitIdx],
    direction: this.props.direction,
  });

  chooseSetting = (name, idx) => () => {
    this.setState({
      [name]: idx,
    });
  };

  fmNum = (num, fixed = 2) => (num * Math.pow(10, fixed)).toFixed(0) / Math.pow(10, fixed);

  render() {
    const {
      direction,
      commodity: {
        Name: name,
        ShowUnit: unit,
        price,
      },
    } = this.props;
    const { marginIdx } = this.state;

    const { amountNum, amount, fee, float } = this.marginArr[marginIdx];
    const amountPrice = this.fmNum(parseInt(price['1'], 10) * amountNum);

    return (
      <div styleName={`order ${direction}`}>
        <div styleName="info">
          <span styleName="color-gray">购买
            <span styleName="color-red">
              <b>{amount}</b>
              {unit}{name}
            </span>,
            市场价<span styleName="color-red"><b>{amountPrice}</b></span>元
          </span>
        </div>
        <div className="table" styleName="setting">
          <div className="tr" styleName="margin">
            <div className="td" styleName="title-dwb less-height">
              <span styleName="color-gray">购买<br />金额<br />(元):</span>
            </div>
            <div className="td" styleName="content">
              {
                this.marginArr.map((item, index) =>
                  <button
                    styleName={`item ${marginIdx === index ? 'active' : ''}`}
                    key={index}
                    onTouchTap={this.chooseSetting('marginIdx', index, amount)}
                  >
                    {item.asset}
                  </button>
                )
              }
            </div>
          </div>
        </div>
        <div className="table" styleName="setting">
          <div className="tr" styleName="info">
            <div className="td" styleName="title-dwb less-height">
              <span styleName="color-gray">手续费:</span>
            </div>
            <div className="td" styleName="content">
              <span styleName="color-red">
                <b>{ fee }</b>元
              </span>（手续费单边收取）
              <span styleName="color-red">
                波动一个点,盈亏<b>{float}</b>元
              </span>
            </div>
          </div>
        </div>
        {
          Object.keys(rangeName).map(n => (
            <div key={n} className="table" styleName="setting">
              <div className="tr" styleName="range">
                <div className="td" styleName="title-dwb">
                  <span styleName="color-gray">{rangeName[n]}:</span>
                </div>
                <div className="td" styleName="content">
                  {
                    this.rangeArr.map((item, index) =>
                      <button
                        styleName={`item item-line ${this.state[n] === index ? 'active' : ''}`}
                        key={`${n}-${index}`}
                        onTouchTap={this.chooseSetting(n, index)}
                      >
                        {parseFloat(item) === 0 ? '无' : `${parseInt(item * 100, 10)}%`}
                      </button>
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
