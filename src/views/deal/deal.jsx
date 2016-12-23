/**
 * Created by admin on 2016/12/22.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './deal.scss';

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div styleName="deal">交易</div>
    );
  }
}

export default cssModules(Deal, styles, { allowMultiple: true, errorWhenNotFound: false });
