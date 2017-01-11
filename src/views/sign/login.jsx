/**
 * Created by admin on 2017/1/4.
 */
import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './login.scss';
import Api from '../../server/api/sign-api';
import { regAccount, regPassword, getQueryString, resetForm } from '../../server/tools';
import Tips from './cummon/tips';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Login extends Component {
  static propTypes = {
    orgId: PropTypes.string,
    systemType: PropTypes.string,
    callback: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false, // 是否显示密码
      isAccountRight: false, // 账号是否正确
      isPassWordRight: false, // 密码是否正确
      orgId: this.props.orgId || getQueryString('organization'),
      systemType: this.props.systemType,
    };
  }

  changePasswordState = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  check = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = e.target.value;
    const id = e.target.getAttribute('id');
    switch (id) {
      case 'account':
        if (regAccount.test(text)) {
          this.setState({
            isAccountRight: true,
          });
        } else {
          this.setState({
            isAccountRight: false,
          });
        }
        break;
      case 'password':
        if (regPassword.test(text)) {
          this.setState({
            isPassWordRight: true,
          });
        } else {
          this.setState({
            isPassWordRight: false,
          });
        }
        break;
      default:
        return false;
    }
    return false;
  };
  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight;
    if (!isSubmit) return;
    const options = {
      orgId: this.props.orgId,
      mobile: this.account.value,
      password: hex_md5(this.password.value),
    };
    Api.login(options).then((json) => {
      resetForm();
      browserHistory.push('/');
      if (this.props.callback) {
        this.props.callback(json);
      }
    }).catch(err => Tips.show(err.message));
  };

  render() {
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight;
    return (
      <div styleName="login-box">
        <div styleName="logo" />
        <form styleName="form-login" autoComplete="off">
          <div styleName="account">
            <label htmlFor="account">
              <span>账号</span>
              <input
                type="text" id="account" placeholder="请输入手机号码" maxLength="11"
                ref={(ref) => { this.account = ref; }} onKeyUp={this.check}
                autoFocus="autofocus"
              />
            </label>
            <span
              styleName={this.state.isAccountRight ? 'icon account-right' : 'icon'}
            />
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <span>密码</span>
              <input
                type={this.state.isShowPassword ? 'text' : 'password'} id="password"
                placeholder="请输入6位密码"
                maxLength="6"
                ref={(ref) => { this.password = ref; }} onKeyUp={this.check}
              />
            </label>
            <span
              styleName={this.state.isShowPassword ? 'icon show-password' : 'icon hide-password'}
              onClick={this.changePasswordState}
            />
          </div>
        </form>
        <div styleName="login">
          <input
            type="submit" styleName={isSubmit ? 'pass' : 'no-pass'} value="登录"
            onClick={this.submit}
          />
        </div>
        <div styleName="forget">
          <div styleName="tr">
            <div styleName="td">
              <Link to="/reset"><input type="button" value="忘记密码？" /></Link>
            </div>
            <div styleName="td">
              <Link to="/"><input type="button" value="随便看看" /></Link>
            </div>
          </div>
        </div>
        <Link to="/register">
          <div styleName="register">
            <input type="button" value="没有账号？请注册" />
          </div>
        </Link>
      </div>
    );
  }
}

