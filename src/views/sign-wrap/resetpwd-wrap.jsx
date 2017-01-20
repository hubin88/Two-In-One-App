/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ResetPwd from '../reset-password';

class ResetPwdWrap extends Component {
  static propTypes = {
    systemInfo: PropTypes.object,
  };
  resetPasswordSuc = () => {
    browserHistory.push('/login');
  };

  render() {
    return (
      <ResetPwd
        resetPasswordSuccess={this.resetPasswordSuc}
        sessionId={this.props.systemInfo.loginData.sessionId}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(ResetPwdWrap);
