
/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div styleName="register">
        register
      </div>
    );
  }
}

export default cssModules(Register, styles, { allowMultiple: true, errorWhenNotFound: false });
