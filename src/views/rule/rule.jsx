import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './rule.scss';

const config = require('../../../app.config');

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Rule extends Component {
  static propTypes = {
    DC: PropTypes.object,
    DW: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      DC: config.htmlPage.DC,
      DW: 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html',
    };
  }

  getRule = () => {
    let htmls = '';

    if (this.state.value === 1) {
      htmls = (
        <iframe src={this.state.DC} />
      );
    } else {
      htmls = (
        <iframe src="http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html" />
      );
    }
    return htmls;
  };
  render() {
    return (
      <div styleName="rule">
        {this.getRule()}
      </div>
    );
  }
}

