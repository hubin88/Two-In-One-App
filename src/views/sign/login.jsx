/**
 * Created by admin on 2017/1/4.
 */
import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './login.scss';
import Api from '../../server/api/sign-api';
import { regAccount, regPassword, getQueryString, resetForm } from '../../server/tools';
import Tips from './cummon/tips';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Login extends Component {
  static propTypes = {
    orgId: PropTypes.number,
    loginSuccess: PropTypes.func,
    toRegister: PropTypes.func,
    toReset: PropTypes.func,
    toHome: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false, // 是否显示密码
      isAccountRight: false, // 账号是否正确
      isPassWordRight: false, // 密码是否正确
      orgId: this.props.orgId || getQueryString('organization'),
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
      const data = JSON.parse(json.result);
      const obj = {
        mobile: this.account.value,
        orgId: this.props.orgId,
        ...data,
      };
      resetForm();
      if (this.props.loginSuccess) {
        this.props.loginSuccess(obj);
      }
    }).catch(err => Tips.show(err.message));
  };

  toReset = () => {
    if (this.props.toReset) {
      this.props.toReset();
    }
  };
  toRegister = () => {
    if (this.props.toRegister) {
      this.props.toRegister();
    }
  };
  toHome = () => {
    if (this.props.toHome) {
      this.props.toHome();
    }
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
                ref={(ref) => { this.account = ref; }} onChange={this.check}
                autoFocus="autofocus"
              />
              <span
                styleName={this.state.isAccountRight ? 'icon account-right' : 'icon'}
              />
            </label>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <span>密码</span>
              <input
                type={this.state.isShowPassword ? 'text' : 'password'} id="password"
                placeholder="请输入6位密码"
                maxLength="6"
                ref={(ref) => { this.password = ref; }} onChange={this.check}
              />
              <span
                styleName={this.state.isShowPassword ? 'icon show-password' : 'icon hide-password'}
                onClick={this.changePasswordState}
              />
            </label>
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
              <input type="button" value="忘记密码？" onClick={this.toReset} />
            </div>
            <div styleName="td">
              <input type="button" value="随便看看" onClick={this.toHome} />
            </div>
          </div>
        </div>
        <div styleName="register">
          <input type="button" value="没有账号？请注册" onClick={this.toRegister} />
        </div>
      </div>
    );
  }
}

