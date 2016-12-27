/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div styleName="login">
        Login
      </div>
    );
  }
}

export default cssModules(Login, styles, { allowMultiple: true, errorWhenNotFound: false });
