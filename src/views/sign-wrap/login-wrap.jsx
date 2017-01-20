/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Login from '../sign/login';
import { afterLogin } from '../../model/action';
import { getQueryString } from '../../server/tools';

class LoginWrap extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    exchangeInfo: PropTypes.object,
  };

  loginSuc = (json) => {
    this.props.dispatch(afterLogin(json, () => {
      const path = getQueryString('source') || '';
      browserHistory.push(`/${path}`);
    }));
  };

  render() {
    return (
      <Login
        loginSuccess={this.loginSuc}
        toRegister={() => { browserHistory.push('/register'); }}
        toReset={() => { browserHistory.push('/reset'); }}
        toHome={() => { browserHistory.push('/'); }}
        orgId={this.props.exchangeInfo.orgId}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(LoginWrap);
