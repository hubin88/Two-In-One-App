/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './property.scss';

class Property extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  recharge = () => {
    alert('充值');
  }
  withdraw = () => {
    alert('提现');
  }

  render() {
    return (
      <div styleName="property">
        <img src={require('../../images/touxiang.jpg')} alt="" />
        <span styleName="property-str">总资产<b styleName="money">68.50</b>元</span>
        <div styleName="button">
          <img src="" alt="" />
          <span styleName="Recharge" onClick={this.recharge}>充值</span>
          <span styleName="withdraw" onClick={this.withdraw}>提现</span>
        </div>
      </div>
    );
  }
}

export default cssModules(Property, styles, { allowMultiple: true, errorWhenNotFound: false });
