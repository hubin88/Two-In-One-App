/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './reset.scss';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div styleName="reset">
        reset
      </div>
    );
  }
}

export default cssModules(Reset, styles, { allowMultiple: true, errorWhenNotFound: false });
