import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './register.scss';
import Dialog from './cummon/dialog';
import Tips from './cummon/tips';
import { Agreement } from './agreement';
import Api from '../../server/api/sign-api';
import {
  regAccount,
  regPassword,
  regCode,
  getQueryString,
  getDevice,
  getCodeAgain,
  resetGetCodeAgain,
  resetForm,
} from '../../server/tools';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Register extends Component {
  static propTypes = {
    orgId: PropTypes.string,
    systemType: PropTypes.string,
    registerSuccess: PropTypes.func,
    type: PropTypes.string,
    sessionId: PropTypes.string,
    resetPhoneSuccess: PropTypes.func,
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
      orgId: this.props.orgId || getQueryString('organization'),
      exchangecode: getQueryString('exchangecode'),
      deviceType: getDevice().toLowerCase(),
      downLoadUrl: null,
      orgName: '机构信息加载中…',
      isRequestOrgName: false,
      systemType: this.props.systemType || getQueryString('systemType'),
    };
  }

  componentDidMount() {
    const titleType = {
      DCB: '云交易注册',
      DWB: '微交易注册',
    };
    const [flagCode, flagOrgId, flagBrokerId] =
      [Boolean(this.state.exchangecode), Boolean(this.state.orgId), Boolean(this.state.brokerId)];
    if (flagBrokerId && flagOrgId) {
      document.title = titleType[this.state.systemType];
      Api.getOrgsName({ orgIds: this.state.orgId }).then((json) => {
        let data;
        if (this.state.systemType === 'DCB') {
          data = JSON.parse(json.result).data[0];
        } else {
          data = JSON.parse(json.result).records[0];
        }
        if (!data) {
          return Tips.show('机构不存在');
        }
        this.setState({
          orgName: data.orgName || data.OrgName,
          isRequestOrgName: true,
        });
        return false;
      }).catch(err => Tips.show(err.message));
    }
    if (flagCode) {
      const options = {
        exchangecode: this.state.exchangecode,
        type: this.state.deviceType,
      };
      Api.queryRegistInfo(options).then((json) => {
        this.setState({
          downLoadUrl: json.result.downUrl,
        });
      });
    }
  }

  showAgreement = () => {
    Dialog.show('用户协议书', Agreement);
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
    const flag = e.target.getAttribute('disabled');
    if (flag) return;
    let options;
    if (this.state.systemType === 'DCB') {
      options = {
        orgId: this.state.orgId,
        mobile: this.account.value,
        sendType: '1',
      };
    } else {
      options = {
        orgId: this.state.orgId,
        mobile: this.account.value,
        msgType: '0',
      };
    }
    Api.getCode(options).then(() => { getCodeAgain('code-btn', this); }).catch(err => Tips.show(err.message));
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
    const options = {
      orgId: this.state.orgId,
      mobile: this.account.value,
      nickName: this.account.value,
      password: hex_md5(this.password.value),
      valiCode: this.code.value,
      brokerId: this.state.brokerId,
      channelType: 'app',
    };
    if (this.props.type === 'register') {
      Api.register(options).then((json) => {
        if (flag) {
          const url = this.state.downLoadUrl;
          if (!url) return false;
          Tips.show(json.message);
          window.location.href = url;
          return false;
        }
        resetGetCodeAgain('code-btn', this);
        resetForm();
        if (this.props.registerSuccess) {
          this.props.registerSuccess();
        }
        return false;
      }).catch(err => Tips.show(err.message));
    } else {
      Api.resetPhone({ sessionId: this.props.sessionId, ...options }).then(() => {
        resetGetCodeAgain('code-btn', this);
        resetForm();
        if (this.props.resetPhoneSuccess) {
          this.props.resetPhoneSuccess();
        }
        return false;
      }).catch(err => Tips.show(err.message));
    }
  };

  render() {
    const isSubmit = this.state.isAccountRight && this.state.isPassWordRight && this.state.isCodeRight;
    console.log(this.props);
    return (
      <div styleName="register-box">
        <div styleName="title">{this.props.type === 'register' ? '手机号注册' : '修改手机号'}</div>
        <form styleName="form-register" autoComplete="off">
          {this.showOrgName()}
          <div styleName="account">
            <label htmlFor="account">
              <input
                type="text" id="account" placeholder="请输入手机号码" maxLength="11"
                ref={(ref) => { this.account = ref; }} onKeyUp={this.check}
                autoFocus="autofocus"
                autoComplete="off"
              />
            </label>
            <span
              styleName={this.state.isAccountRight ? 'icon account-right' : 'icon'}
            />
          </div>
          <div styleName="code">
            <label htmlFor="code">
              <input
                type="text" id="code" placeholder="请输入短信验证码" maxLength="4"
                ref={(ref) => { this.code = ref; }} onKeyUp={this.check}
                autoComplete="off"
              />
            </label>
            <span styleName="icon" />
            <div styleName="code-btn">
              <input
                type="button"
                id="code-btn"
                styleName={this.state.isCodeRequest ? 'code pass' : 'code no-pass'}
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
                autoComplete="off"
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
            type="submit" styleName={isSubmit ? 'submit-btn pass' : 'submit-btn no-pass'} value="提交"
            onClick={this.submit}
          />
        </div>
        {
          this.props.type === 'register' ?
            <div styleName="agreement">
              提交注册表示您已阅读并同意<span onClick={this.showAgreement}>《用户协议书》</span>
            </div> : null
        }
      </div>
    );
  }
}
