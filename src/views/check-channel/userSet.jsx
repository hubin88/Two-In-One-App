/**
 * Created by dell on 2017/1/6.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import styles from './userSet.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';
import TopReturn from '../../components/topTeturn/topReturn';
import Api from '../../server/api/sign-api';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Userset extends Component {
  static defaultProps = {
    title: '个人设置',
    ifSure: false,
  };

  static propTypes = {
    systemInfo: PropTypes.object.isRequired,
    exchangeInfo: PropTypes.object,
    onCloseCallback: PropTypes.func,
    title: PropTypes.string,
    ifSure: PropTypes.bool,
    dispatch: PropTypes.func,
    children: PropTypes.any,
    route: PropTypes.object,
  };

  componentDidMount() {

  }

  setValue = () => {
    let tpl = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tpl = (
        <div styleName="main">
          <ul>
            <li>
              <Link to="/">
                <span styleName="listLeft">头像</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/">
                <span styleName="listLeft">昵称</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/resetphone">
                <span styleName="listLeft">验证手机</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/resetpwd">
                <span styleName="listLeft">交易密码</span>
              </Link>
            </li>
          </ul>
          <div styleName="out" onClick={this.userOut}>退出登录</div>
        </div>
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      tpl = (
        <div styleName="main">
          <ul>
            <li>
              <Link to="/">
                <span styleName="listLeft">头像</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/">
                <span styleName="listLeft">昵称</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/resetphone">
                <span styleName="listLeft">验证手机</span>
              </Link>
              <span styleName="listRight">22</span>
            </li>
            <li>
              <Link to="/resetpwd">
                <span styleName="listLeft">交易密码</span>
              </Link>
            </li>
          </ul>
          <div styleName="out" onClick={this.userOut}>退出登录</div>
        </div>
      );
    }
    return tpl;
  };

  // 退出登陆
  userOut = () => {
    Api.loginOut({
      sessionId: this.props.systemInfo.loginData.sessionId,
    }).then(()=> {
      browserHistory.push('/login')
    });
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

