/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import SingleHtml from '../single-html/single-html';

export default class Withdraw extends Component {
  static defaultProps = {
    htmlURL: 'withdraw(提现)h5地址url参数',
  };
  static propTypes = {
    htmlURL: PropTypes.string,
  };

  render() {
    return (
      <SingleHtml htmlURL={this.props.htmlURL} />
    );
  }
}
