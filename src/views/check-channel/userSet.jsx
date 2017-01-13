/**
 * Created by dell on 2017/1/6.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './userSet.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';
import TopReturn from '../../components/topTeturn/topReturn';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Userset extends Component {
  static defaultProps = {
    title: '个人设置',
    ifSure: false,
  };
  static propTypes = {
    systemInfo: PropTypes.object.isRequired,
    onCloseCallback: PropTypes.func,
    title: PropTypes.string,
    ifSure: PropTypes.bool,
  };


  setValue = () => {
    let tpl = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tpl = (
        <div styleName="main">
          <ul>
            <li><span styleName="listLeft">头像</span><span styleName="listRight">22</span></li>
            <li>
              <span styleName="listLeft" onClick={this.setNickName}>昵称</span>
              <span styleName="listRight">22</span>
            </li>
            <li onClick={this.register}>
              <span styleName="listLeft">验证手机</span><span styleName="listRight">22</span>
            </li>
            <li onClick={this.reset}><span styleName="listLeft">交易密码</span></li>
          </ul>
          <div styleName="out" onClick={this.userOut}>退出登录</div>
        </div>
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      tpl = (
        <div styleName="main">
          <ul>
            <li><span styleName="listLeft">头像</span><span styleName="listRight">22</span></li>
            <li><span styleName="listLeft">昵称</span><span styleName="listRight">22</span></li>
            <li><span styleName="listLeft">验证手机</span><span styleName="listRight">22</span></li>
            <li><span styleName="listLeft">交易密码</span></li>
          </ul>
          <div styleName="out">退出登录</div>
        </div>
      );
    }
    return tpl;
  };


  // 设置昵称
  setNickName = () => {
    location.href = '/nickName';
  };
  // 验证手机
  register = () => {
    location.href = '/register';
  };
  // 修改密码
  reset = () => {
    location.href = '/reset';
  };
  // 退出登陆
  userOut = () => {
    location.href = '/login';
  };

  render() {
    return (
      <div styleName="userSet">
        <TopReturn title={this.props.title} ifSure={this.props.ifSure} />
        {this.setValue()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Userset);

