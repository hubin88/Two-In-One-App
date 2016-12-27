/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './single-html.scss';

class SingleHtml extends Component {
  static propTypes = {
    htmlURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onCloseCallback: PropTypes.func,
  };
  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };
  render() {
    return (
      <div styleName="single-html">
        <input type="button" styleName="close" onClick={this.toUpper} />
        <div styleName="titleName">

          <span>{this.props.title}</span>
        </div>
        <iframe src={this.props.htmlURL} />
      </div>
    );
  }
}

export default cssModules(SingleHtml, styles, { allowMultiple: true, errorWhenNotFound: false });
