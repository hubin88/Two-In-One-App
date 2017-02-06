/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ModifyPwd from './moidfy-pwd';
import Header from '../../../../components/header/header';

class ModifyPwdWrap extends Component {
  static defaultProps = {
    title: '交易密码',
  };
  static propTypes = {
    title: PropTypes.string,
    systemInfo: PropTypes.object,
  };
  resetPasswordSuc = () => {
    browserHistory.push('/login');
  };

  back() {
    browserHistory.push('/userSet');
  }

  render() {
    return (
      <div>
        <header>
          <Header
            title={this.props.title}
            leftBtnCallBack={this.back}
            rightBtnCallBack={this.submitFuc}
          />
        </header>
        <section>
          <ModifyPwd
            resetPasswordSuccess={this.resetPasswordSuc}
            sessionId={this.props.systemInfo.loginData.sessionId}
          />
        </section>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(ModifyPwdWrap);
