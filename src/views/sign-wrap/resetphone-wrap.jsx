/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Register from '../sign/register';

class ResetphoneWrap extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
  };
  resetPhoneSuc = () => {
    browserHistory.push('/login');
  };

  render() {
    return (
      <Register
        resetPhoneSuccess={this.resetPhoneSuc}
        orgId={this.props.exchangeInfo.orgId}
        systemType={this.props.systemInfo.systemType}
        sessionId={this.props.systemInfo.loginData.sessionId}
        type="resetphone"
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(ResetphoneWrap);
