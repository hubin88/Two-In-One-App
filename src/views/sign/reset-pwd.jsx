import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './reset-pwd.scss';
import Api from '../../server/api/sign-api';
import Tips from './cummon/tips';
import {
  regAccount,
  regPassword,
  regCode,
  getQueryString,
  getCodeAgain,
  resetGetCodeAgain,
  resetForm,
} from '../../server/tools';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class ResetPwd extends Component {
  static propTypes = {
    orgId: PropTypes.number,
    systemType: PropTypes.string,
    resetSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false, // 是否显示密码
      isAccountRight: false, // 账号是否正确
      isPassWordRight: false, // 密码是否正确
      isCodeRequest: false, // 验证码按钮是否可以点击
      isCodeRight: false, // 验证码是否正确
      isAccountEmpty: true, // 账号是否是空
      codeBtnValue: '获取短信验证码',
      orgId: this.props.orgId || getQueryString('organization'),
      systemType: this.props.systemType || getQueryString('systemType'),
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
    const val = e.target.value;
    const id = e.target.getAttribute('id');
    switch (id) {
      case 'account':
        if (regAccount.test(val)) {
          this.setState({
            isAccountRight: true,
            isCodeRequest: true,
          });
        } else {
          this.setState({
            isAccountRight: false,
            isCodeRequest: false,
          });
        }
        if (val === '') {
          this.setState({
            isAccountEmpty: true,
          });
        } else {
          this.setState({
            isAccountEmpty: false,
          });
        }
        break;
      case 'password':
        if (regPassword.test(val)) {
          this.setState({
            isPassWordRight: true,
          });
        } else {
          this.setState({
            isPassWordRight: false,
          });
        }
        break;
      case 'code':
        if (regCode.test(val)) {
          this.setState({
            isCodeRight: true,
          });
        } else {
          this.setState({
            isCodeRight: false,
          });
        }
        break;
      default:
        return false;
    }
    return false;
  };
  forgetPwdGetCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.isCodeRequest) return;
    const options = {
      orgId: this.props.orgId,
      mobile: this.account.value,
      sendType: '2',
    };
    Api.getCode(options).then(() => { getCodeAgain('code-btn', this); }).catch(err => Tips.show(err.message));
  };

  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    if (!isSubmit) return;
    const options = {
      orgId: this.props.orgId,
      mobile: this.account.value,
      newPwdOne: hex_md5(this.password.value),
      valiCode: this.code.value,
    };
    Api.forgetPassword(options).then(() => {
      resetGetCodeAgain('code-btn', this);
      resetForm();
      if (this.props.resetSuccess) {
        this.props.resetSuccess();
      }
    }).catch(err => Tips.show(err.message));
  };
  clearAccount = () => {
    if (this.state.isAccountRight) return;
    this.account.value = '';
    this.setState({
      isAccountEmpty: true,
    });
  };

  render() {
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    return (
      <div styleName="forget-password-box">
        <div styleName="title">重设交易密码</div>
        <form styleName="form-forget-password" autoComplete="off">
          <div styleName="account">
            <label htmlFor="account">
              <input
                type="text" id="account" placeholder="请输入手机号码" maxLength="11"
                autoFocus="autofocus"
                ref={(ref) => { this.account = ref; }} onChange={this.check}
              />
              {this.state.isAccountEmpty ? null :
              <span
                onTouchTap={this.clearAccount}
                styleName={this.state.isAccountRight ? 'icon account-right' : 'icon account-error'}
              />
              }
            </label>
          </div>
          <div styleName="code">
            <label htmlFor="code">
              <input
                type="text" id="code" placeholder="请输入短信验证码"
                ref={(ref) => { this.code = ref; }}
                onChange={this.check}
              />
            </label>
            <div styleName="code-btn">
              <input
                type="button"
                id="code-btn"
                styleName={this.state.isCodeRequest ? 'pass' : 'no-pass'}
                value={this.state.codeBtnValue}
                onTouchTap={this.forgetPwdGetCode}
              />
            </div>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <input
                type={this.state.isShowPassword ? 'text' : 'password'} id="password"
                placeholder="请输入新的交易密码"
                maxLength="12"
                ref={(ref) => { this.password = ref; }} onChange={this.check}
              />
              <span
                styleName={this.state.isShowPassword ? 'icon show-password' : 'icon hide-password'}
                onTouchTap={this.changePasswordState}
              />
            </label>
          </div>
        </form>
        <div styleName="submit">
          <input
            type="submit" styleName={isSubmit ? 'pass' : 'no-pass'} value="提交"
            onTouchTap={this.submit}
          />
        </div>
      </div>
    );
  }
}

