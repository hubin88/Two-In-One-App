/**
 * Created by Amg on 2017/1/19.
 */

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import AppConfig from '../../server/app-config';
import Header from '../../components/header/header';

class UserWrap extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    onCloseCallback: PropTypes.func,
    location: PropTypes.object,
    systemInfo: PropTypes.object,
  };

  back() {
    browserHistory.push('/user');
  }

  render() {
    const pathName = this.props.location.pathname;
    const userChannel = AppConfig.userChannel()[pathName.substring(1)];
    const title = userChannel.title || '';
    return (
      <div>
        <Header title={title} leftBtnCallBack={this.back} />
        {this.props.children}
      </div>
    );
  }
}

export default UserWrap;
