import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './reset.scss';
import Api from '../../server/api/sign-api';
import { regAccount, regPassword, regCode } from '../../server/tools';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Reset extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    appState: PropTypes.object,
    loginState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false, // 是否显示密码
      isAccountRight: false, // 账号是否正确
      isPassWordRight: false, // 密码是否正确
      isCodeRequest: false, // 验证码按钮是否可以点击
      isCodeRight: false, // 验证码是否正确
      codeBtnValue: '获取短信验证码',
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
            isCodeRequest: true,
          });
        } else {
          this.setState({
            isAccountRight: false,
            isCodeRequest: false,
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
      case 'code':
        if (regCode.test(text)) {
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
    const { appState } = this.props;
    if (!this.state.isCodeRequest) return;
    const options = {
      orgId: appState.orgId,
      mobile: this.account.value,
      sendType: '2',
    };
    Api.getCode(this, options);
  };

  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { appState } = this.props;
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    if (!isSubmit) return;
    const options = {
      orgId: appState.orgId,
      mobile: this.account.value,
      newPwdOne: hex_md5(this.password.value),
      valiCode: this.code.value,
    };
    Api.forgetPwdSubmit(options, '/');
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
                type="text" id="account" placeholder="请输入手机号码" autoFocus="autofocus"
                ref={(ref) => { this.account = ref; }} onKeyUp={this.check}
              />
            </label>
            <span
              styleName={this.state.isAccountRight ? 'icon account-right' : 'icon'}
            />
          </div>
          <div styleName="code">
            <label htmlFor="code">
              <input
                type="text" id="code" placeholder="请输入短信验证码"
                ref={(ref) => { this.code = ref; }}
                onKeyUp={this.check}
              />
            </label>
            <span styleName="icon" />
            <div styleName="code-btn">
              <input
                type="button"
                styleName={this.state.isCodeRequest ? 'pass' : 'no-pass'}
                value={this.state.codeBtnValue}
                onClick={this.forgetPwdGetCode}
              />
            </div>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <input
                type={this.state.isShowPassword ? 'text' : 'password'} id="password"
                placeholder="请输入新的交易密码"
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
        <div styleName="submit">
          <input
            type="submit" styleName={isSubmit ? 'pass' : 'no-pass'} value="提交"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

export default connect(mapStateToProps)(Reset);

