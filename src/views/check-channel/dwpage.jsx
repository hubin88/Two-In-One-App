/**
 * Created by dell on 2017/1/5.
 */

import React, { Component, PropTypes } from 'react';
import SingleHtml from '../single-html/single-html';

export default class Dwpage extends Component {
  static defaultProps = {
    htmlURL: 'http://baidu.com',
    title: '点微宝介绍',
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

