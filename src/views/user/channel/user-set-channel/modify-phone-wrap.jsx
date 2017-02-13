/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Register from '../../../sign/register'; // TODO: 调用register组件
import Header from '../../../../components/header/header';

class ModifyPhoneWrap extends Component {
  static defaultProps = {
    title: '验证手机',
  };
  static propTypes = {
    dispatch: PropTypes.func,
    title: PropTypes.string,
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
  };

  resetPhoneSuc = () => {
    browserHistory.push('/login');
  };

  back() {
    browserHistory.push('/userSet');
  }

  render() {
    return (
      <div className="wrap">
        <header>
          <Header
            title={this.props.title}
            leftBtnCallBack={this.back}
            rightBtnCallBack={this.submitFuc}
          />
        </header>
        <section>
          <Register
            resetPhoneSuccess={this.resetPhoneSuc}
            orgId={this.props.exchangeInfo.orgId}
            systemType={this.props.systemInfo.systemType}
            sessionId={this.props.systemInfo.loginData.sessionId}
            type="resetphone"
          />
        </section>
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

export default connect(mapStateToProps)(ModifyPhoneWrap);
