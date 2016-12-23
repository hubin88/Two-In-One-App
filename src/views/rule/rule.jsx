/**
 * Created by admin on 2016/12/22.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './rule.scss';

class Rule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div styleName="rule">规则</div>
    );
  }
}

export default cssModules(Rule, styles, { allowMultiple: true, errorWhenNotFound: false });
