/**
 * Created by admin on 2016/12/29.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Login from '../sign/login';
import Register from '../sign/register';
import Reset from '../sign/reset';
import { login } from '../../model/action';
import { getQueryString } from '../../server/tools';

import '../../css/main.scss'; // import global css style

class Persponal extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
    children: PropTypes.any,
    route: PropTypes.object,
  };

  back = () => {
    window.history.go(-1);
  };
  loginSuc = (json) => {
    this.props.dispatch(login(JSON.parse(json.result)).then(()=>{
      const path = getQueryString('source') || '';
      browserHistory.push(`/${path}`);
    }))
  };
  registerSuccess = () => {
    browserHistory.push('/');
  }
  childrenComponent = (path) => {
    switch (path) {
      case '/login':
        return (<Login
          loginSuccess={
            this.loginSuc
          }
          toRegister={() => {
            browserHistory.push('/register');
          }}
          toReset={() => {
            browserHistory.push('/reset');
          }}
          toHome={() => {
            browserHistory.push('/');
          }}
          orgId={this.props.exchangeInfo.orgId}
        />);
      case '/register':
        return (
          <Register
            registerSuccess={
              this.registerSuccess
            }
            orgId={this.props.exchangeInfo.orgId}
            systemType={this.props.systemInfo.systemType}
          />
        );
      case '/reset':
        return (
          <Reset />
        );
      default:
        return null;
    }
  };

  render() {
    const { systemInfo, exchangeInfo: { systemList }, route: { path } } = this.props;
    console.log(this.props);
    let titleName = null;
    Object.values(systemList).forEach((val) => {
      if (val.type === systemInfo.systemType) {
        titleName = val.label;
        return;
      }
    });
    return (
      <div className="content" ref={(ref) => { this.content = ref; }}>
        <div className="header">
          <input type="button" className="back" onClick={() => { this.back(); }} />
          {titleName}
        </div>
        {this.childrenComponent(path)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(Persponal);
