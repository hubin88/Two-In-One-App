/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Register from '../sign/register';

class RegisterWrap extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
  };
  registerSuc = () => {
    browserHistory.push('/');
  };

  render() {
    return (
      <div styleName="content">
        <Register
          registerSuccess={this.registerSuc}
          orgId={this.props.exchangeInfo.orgId}
          systemType={this.props.systemInfo.systemType}
          type="register"
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(RegisterWrap);
