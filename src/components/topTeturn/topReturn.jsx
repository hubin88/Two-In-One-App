/**
 * Created by dell on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './topReturn.scss';

class TopReturn extends Component {
  static propTypes = {
    title: PropTypes.string,
    ifSure: PropTypes.bool,
    onCloseCallback: PropTypes.func,
    sureClick: PropTypes.func,
  };
  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };
  sure = () => {
    let tpl = '';
    if (this.props.ifSure) {
      tpl = (
        <span styleName="sure" onClick={this.props.sureClick}>保存</span>
      );
    }
    return tpl;
  };
  render() {
    return (
      <div styleName="topReturn">
        <div styleName="titleName">
          <input type="button" styleName="close" onClick={this.toUpper} />
          <span>{this.props.title}</span>
          {this.sure()}
        </div>
      </div>
    );
  }
}

export default cssModules(TopReturn, styles, { allowMultiple: true, errorWhenNotFound: false });

