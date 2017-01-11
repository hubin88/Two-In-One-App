/**
 * Created by dell on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './topReturn.scss';

class TopReturn extends Component {
  static propTypes = {
    title: PropTypes.string,
    onCloseCallback: PropTypes.func,
  };
  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };
  render() {
    return (
      <div styleName="topReturn">
        <div styleName="titleName">
          <input type="button" styleName="close" onClick={this.toUpper} />
          <span>{this.props.title}</span>
        </div>
      </div>
    );
  }
}

export default cssModules(TopReturn, styles, { allowMultiple: true, errorWhenNotFound: false });

