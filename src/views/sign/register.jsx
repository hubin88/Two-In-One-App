import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './register.scss';
import Dialog from './cummon/dialog';
import Tips from './cummon/tips';
import { text } from '../../server/text';
import Api from '../../server/api';
import {
  regAccount,
  regPassword,
  regCode,
  isEmpty,
  getQueryString,
  getDevice,
} from '../../server/tools';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    appState: PropTypes.object,
    registerState: PropTypes.object,
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
      brokerId: getQueryString('brokerId'),
      orgId: getQueryString('organization') || this.props.appState.orgId,
      exchangecode: getQueryString('exchangecode'),
      deviceType: getDevice(),
      downLoadUrl: null,
      orgName: '机构信息加载中…',
      isRequestOrgName: false,
      isShowAccountIcon: false,
      isSubmited: false,
      title: getQueryString('systemType'),
    };
  }

  componentDidMount() {
    const titleType = {
      DCB: '云交易注册',
      DWB: '微交易注册',
    };
    document.title = titleType[this.state.title];
    const [flagCode,flagOrgId,flagBrokerId] =
      [Boolean(this.state.exchangecode), Boolean(this.state.orgId), Boolean(this.state.brokerId)];
    if (flagBrokerId && flagOrgId) {
      this.getOrganization({ orgIds: this.state.orgId });
    }
    if (flagCode) {
      const options = {
        exchangecode: this.state.exchangecode,
        type: this.state.deviceType,
      };
      this.getDownLoadUrl(options);
    }
  }

  getDownLoadUrl = (options) => {
    Api.getDownLoadUrl(options).then((json) => {
      if (json.code === 0) {
        this.setState({
          downLoadUrl: json.result.downUrl,
        });
        return false;
      }
      return false;
    });
  };

  getOrganization = (options) => {
    Api.getOrgInfo(options).then((json) => {
      if (json.code === 0) {
        const data = JSON.parse(json.result).data[0];
        if (!data) {
          return Tips.show('机构不存在');
        }
        this.setState({
          orgName: data.orgName,
          isRequestOrgName: true,
        });
      }
      return false;
    });
  };

  showAgreement = () => {
    Dialog.show('用户协议书', text);
  };

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
        if (isEmpty(val)) {
          this.setState({
            isShowAccountIcon: false,
          });
        } else {
          this.setState({
            isShowAccountIcon: true,
          });
        }
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

  registerGetCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.isCodeRequest) return;
    const options = {
      orgId: this.state.orgId,
      mobile: this.account.value,
      sendType: '1',
    };
    Api.getCode(this, options);
  };

  showOrgName = () => {
    const flag = Boolean(this.state.brokerId);
    if (flag) {
      if (this.state.isRequestOrgName) {
        return (
          <div styleName="organization"><p>{this.state.orgName}</p><span styleName="alerady" />
          </div>
        );
      }
      return (
        <div styleName="organization"><p>{this.state.orgName}</p><span styleName="loading" />
        </div>
      );
    }
    return null;
  };

  submit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const flag = Boolean(this.state.brokerId);
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    if (!isSubmit) return;
    if (this.state.isSubmited) return;
    const options = {
      orgId: this.state.orgId,
      mobile: this.account.value,
      nickName: this.account.value,
      password: hex_md5(this.password.value),
      valiCode: this.code.value,
      brokerId: this.state.brokerId,
      channelType: 'app',
    };
    Api.registerSubmit(options, flag, this.state.downLoadUrl, '/');
    this.submitref.setAttribute('disabled', true);
    this.setState({
      isSubmited: true,
    });
  };

  render() {
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    return (
      <div styleName="register-box">
        <div styleName="title">手机号注册</div>
        <form styleName="form-register" autoComplete="off">
          {this.showOrgName()}
          <div styleName="account">
            <label htmlFor="account">
              <input
                type="text" id="account" placeholder="请输入手机号码" maxLength="11"
                ref={(ref) => { this.account = ref; }} onKeyUp={this.check}
                autoFocus="autofocus"
              />
            </label>
            {this.state.isShowAccountIcon ?
              <span
                styleName={this.state.isAccountRight ? 'icon account-right' : 'icon'}
              /> : <span styleName="icon" /> }
          </div>
          <div styleName="code">
            <label htmlFor="code">
              <input
                type="text" id="code" placeholder="请输入短信验证码" maxLength="4"
                ref={(ref) => { this.code = ref; }} onKeyUp={this.check}
              />
            </label>
            <span styleName="icon" />
            <div styleName="code-btn">
              <input
                type="button"
                styleName={this.state.isCodeRequest ? 'pass' : 'no-pass'}
                value={this.state.codeBtnValue}
                onClick={this.registerGetCode}
              />
            </div>
          </div>
          <div styleName="password">
            <label htmlFor="password">
              <input
                type={this.state.isShowPassword ? 'text' : 'password'} id="password"
                placeholder="请输入6位交易密码"
                maxLength="6"
                ref={(ref) => { this.password = ref; }} onKeyUp={this.check}
              />
            </label>
            <span
              styleName={this.state.isShowPassword ? ('icon show-password') : ('icon hide-password')}
              onClick={this.changePasswordState}
            />
          </div>
        </form>
        <div styleName="submit">
          <input
            type="submit" styleName={isSubmit ? 'pass' : 'no-pass'} value="提交"
            ref={(ref) => { this.submitref = ref; }}
            onClick={this.submit}
          />
        </div>
        <div styleName="agreement">提交注册表示您已阅读并同意<span onClick={this.showAgreement}>《用户协议书》</span>
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

export default connect(mapStateToProps)(Register);

