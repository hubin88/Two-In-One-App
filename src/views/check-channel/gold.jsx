/**
 * Created by dell on 2016/12/27.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './gold.scss';


class Gold extends Component {
  static defaultProps = {
    title: '',
  };
  static propTypes = {
    onCloseCallback: PropTypes.func,
  };

  setValue = () => {
    let tab = '';
    const num = 10;
    if (num <= 10) {
      tab = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="mainLeft">资金调整</div>
            <div styleName="mainRight">
              <b>订单号：</b><b>X</b>
            </div>
            <div styleName="mainLeft"><i>图片</i><span>21</span></div>
            <div styleName="mainRight"><i>建仓时间</i></div>
          </div>
          <div styleName="notMore">没有更多</div>
        </div>
      );
    } else {
      tab = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="mainLeft">资金调整</div>
            <div styleName="mainRight">
              <b>订单号：</b><b>X</b>
            </div>
            <div styleName="mainLeft"><i>图片</i><span>21</span></div>
            <div styleName="mainRight"><i>建仓时间</i></div>
          </div>
        </div>
      );
    }
    return tab;
  };

  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };

  render() {
    return (
      <div styleName="gold">
        <input type="button" styleName="close" onClick={this.toUpper} />
        <div styleName="titleName">
          <span>出入金记录</span>
        </div>
        {this.setValue()}
      </div>
    );
  }
}

export default cssModules(Gold, styles, { allowMultiple: true, errorWhenNotFound: false });
