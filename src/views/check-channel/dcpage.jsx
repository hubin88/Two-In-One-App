/**
 * Created by dell on 2017/1/5.
 */

import React, { Component, PropTypes } from 'react';
import SingleHtml from '../single-html/single-html';

export default class Dcpage extends Component {
  static defaultProps = {
    htmlURL: 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html',
    title: '点差宝介绍',
  };
  static propTypes = {
    htmlURL: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    return (
      <SingleHtml htmlURL={this.props.htmlURL} title={this.props.title} />
    );
  }
}
