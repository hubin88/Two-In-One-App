/**
 * Created by admin on 2017/1/16.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './modify-pwd.scss';
import Api from '../../../../server/api/sign-api';
import Tips from '../../../sign/cummon/tips';
import {
  regPassword,
  resetForm,
} from '../../../../server/tools';

class ModifyPwd extends Component {
  static propTypes = {
    resetPasswordSuccess: PropTypes.func,
    sessionId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOldPwdRight: false,
      isNewPwdRight: false,
      isAgainPwdRight: false,
    };
  }

  check = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const text = e.target.value;
    const id = e.target.getAttribute('id');
    switch (id) {
      case 'old-password':
        if (regPassword.test(text)) {
          this.setState({
            isOldPwdRight: true,
          });
        } else {
          this.setState({
            isOldPwdRight: false,
          });
        }
        break;
      case 'new-password':
        if (regPassword.test(text)) {
          this.setState({
            isNewPwdRight: true,
          });
        } else {
          this.setState({
            isNewPwdRight: false,
          });
        }
        break;
      case 'again-password':
        if (regPassword.test(text)) {
          if (text === this.password.value) {
            this.setState({
              isAgainPwdRight: true,
            });
          } else {
            this.setState({
              isAgainPwdRight: false,
            });
            Tips.show('新密码两次输入不一致');
          }
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
    const isSubmit = this.state.isOldPwdRight && this.state.isNewPwdRight && this.state.isAgainPwdRight;
    if (!isSubmit) return;
    const options = {
      sessionId: this.props.sessionId,
      oldPwd: hex_md5(this.oldPassword.value),
      newPwdOne: hex_md5(this.password.value),
    };
    Api.resetPassword(options).then(() => {
      resetForm();
      if (this.props.resetPasswordSuccess) {
        this.props.resetPasswordSuccess();
      }
    }).catch(err => Tips.show(err.message));
  };

  render() {
    const isSubmit = this.state.isOldPwdRight && this.state.isNewPwdRight && this.state.isAgainPwdRight;
    return (
      <div styleName="modify-password">
        <div styleName="title">修改交易密码</div>
        <form styleName="reset-password" autoComplete="off">
          <div styleName="password">
            <input
              type="password" id="old-password" placeholder="请输入原密码" maxLength="6"
              autoFocus="autofocus"
              ref={(ref) => { this.oldPassword = ref; }}
              onChange={this.check}
            />
          </div>
          <div styleName="password">
            <input
              type="password" id="new-password"
              placeholder="请设置6位密码"
              maxLength="6"
              ref={(ref) => { this.password = ref; }} onChange={this.check}
            />
          </div>
          <div styleName="password">
            <input
              type="password" id="again-password" placeholder="请输入原密码" maxLength="6"
              onKeyUp={this.check}
            />
          </div>
        </form>
        <div styleName="submit">
          <input
            type="submit" styleName={isSubmit ? 'pass' : 'no-pass'} value="保存"
            onClick={this.submit}
          />
        </div>
      </div>
    );
  }
}

export default cssModules(ModifyPwd, styles, { allowMultiple: true, errorWhenNotFound: false });
