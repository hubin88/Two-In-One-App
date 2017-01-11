/**
 * Created by dell on 2017/1/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './hold.scss';

class Hold extends Component {
  static propTypes = {
    value: '',
    onCloseCallback: PropTypes.func,
  };

  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };
  render() {
    return (
      <div styleName="hold">
        <input type="button" styleName="close" onClick={this.toUpper} />
        <div styleName="titleName">
          <span>当前持仓</span>
        </div>
        <div styleName="holdValue">
          <span>持仓总盈亏(元)</span>
          <p styleName="profit">{this.props.value}</p>
        </div>
      </div>
    );
  }
}

export default cssModules(Hold, styles, { allowMultiple: true, errorWhenNotFound: false });

