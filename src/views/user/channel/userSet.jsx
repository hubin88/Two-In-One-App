/**
 * Created by dell on 2017/1/6.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import styles from './userSet.scss';
import { loginOut, errorLogout } from '../../../model/action';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class UserSet extends Component {
  static defaultProps = {
    title: '个人设置',
    ifSure: false,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object.isRequired,
    exchangeInfo: PropTypes.object,
    onCloseCallback: PropTypes.func,
    title: PropTypes.string,
    ifSure: PropTypes.bool,
    children: PropTypes.any,
    route: PropTypes.object,
  };

  setValue = () => {
    const { mobile, avatarURL, nickName } = this.props.systemInfo;
    const tpl = (
      <div styleName="main">
        <ul>
          <a onTouchTap={this.showImg}>
            <li>
              <span styleName="listLeft">头像</span>
              <span styleName="listRight">
                <span styleName="text">
                  <img src={avatarURL} alt="" />
                </span>
              </span>
            </li>
          </a>
          <Link to="/modifyName">
            <li>
              <span styleName="listLeft">昵称</span>
              <span styleName="listRight">
                <span styleName="text">{nickName}</span>
              </span>
            </li>
          </Link>
          <Link to="/modifyPhone">
            <li>
              <span styleName="listLeft">验证手机</span>
              <span styleName="listRight">
                <span styleName="text">{mobile}</span>
              </span>
            </li>
          </Link>
          <Link to="/modifyPwd">
            <li>
              <span styleName="listLeft">交易密码</span>
              <span styleName="listRight" />
            </li>
          </Link>
        </ul>
        <div styleName="out" onTouchTap={this.userOut}>退出登录</div>
      </div>
    );
    return tpl;
  };

  showImg = () => {};
  // 退出登陆
  userOut = () => {
    const obj = { sessionId: this.props.systemInfo.loginData.sessionId };
    this.props.dispatch(loginOut(obj)).then(() => {
      browserHistory.push('/login');
    }).catch(() => this.props.dispatch(errorLogout()));
  };

  render() {
    return (
      <div styleName="userSet">
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

export default connect(mapStateToProps)(UserSet);

