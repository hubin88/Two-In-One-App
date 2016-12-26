/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './login.scss';

class Login extends Component {
  render() {
    return (
      <div styleName="login">
        Login
      </div>
    );
  }
}

export default cssModules(Login, styles, { allowMultiple: true, errorWhenNotFound: false });
