/**
 * Created by admin on 2016/12/22.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './info.scss';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div styleName="info">我</div>
    );
  }
}

export default cssModules(Info, styles, { allowMultiple: true, errorWhenNotFound: false });
