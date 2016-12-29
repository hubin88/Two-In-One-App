import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './user.scss';
import { login, logout } from '../../model/action';
import SysApi from '../../server/api/sys-api';

const assetLists = {
  DCB: [
    { name: 'allCash', label: '总资产' },
    { name: 'availableCash', label: '可用资金' },
    { name: 'frozenCash', label: '占用合约定金' },
  ],
  DWB: [
    { name: 'allCash', label: '总资产' },
    { name: 'availableCash', label: '可用资金' },
    { name: 'frozenCash', label: '占用资金' },
    { name: 'cashEarnAll', label: '持仓盈亏' },
  ],
};

const checkChannel = [
  { type: 'pay', label: '充值', direction: '/pay' },
  { type: 'withdraw', label: '提现', direction: '/withdraw' },
];

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemInfo: PropTypes.object.isRequired,
  };

  clickFunc = (type) => () => {
    if (type === 1) {
      this.props.dispatch(login());
      SysApi.getUserData({ userID: '2222222' });
    }
    if (type === 2) this.props.dispatch(logout());
  };

  render() {
    const { systemInfo: { systemType, assetInfo, isLogin, avatarURL, nickName } } = this.props;
    return (
      <div styleName="user">
        <div styleName="info">
          <div style={{ position: 'fixed', top: '10px', left: '10px' }}>

            <b onClick={this.clickFunc(1)}><span>登录</span></b>
            <b onClick={this.clickFunc(2)}><span>登出</span></b>
          </div>
          <div styleName="avatar">
            <img src={avatarURL} alt="" />
          </div>
          <div styleName="middle">
            {
              isLogin ?
                <div><span>{nickName}</span></div> :
                <div>
                  <button><Link to="/join">注册</Link></button>
                  <button><Link to="/login">登录</Link></button>
                </div>
            }
          </div>
          <ol className="table" styleName="asset">
            {
              assetLists[systemType].map((assetItem) => {
                const amount = isLogin && assetInfo[assetItem.name] ?
                  assetInfo[assetItem.name] : '- -';
                return (
                  <li key={assetItem.name} className="td" styleName="asset-item">
                    <span styleName="asset-amount">{amount}</span>
                    <span styleName="asset-name">{assetItem.label}</span>
                  </li>
                );
              })
            }

          </ol>
        </div>
        {
          isLogin ? (<ol className="table" styleName="check-channel">
            {
              checkChannel.map((channel) => (
                <li key={channel.type} className="td" styleName={`channel-${channel.name}`}>
                  <Link to={channel.direction}>{channel.label}</Link>
                </li>
              ))
            }
          </ol>) : null
        }
        <div styleName="links">
          底部
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(User);

