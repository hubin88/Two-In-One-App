import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './user.scss';
import { login, logout } from '../../model/action';
import SysApi from '../../server/api/sys-api';
import { SYS_DCB, SYS_DWB } from '../../server/define';

const renderList = {
  [SYS_DCB]: {
    asset: [
      { name: 'allCash', label: '总资产' },
      { name: 'availableCash', label: '可用资金' },
      { name: 'frozenCash', label: '占用合约定金' },
    ],
    channel: [
      { name: 'gold', label: '出入金', direction: '/gold' },
      { name: 'userCenter', label: '个人设置', direction: '/userSet' },
      { name: 'dcpage', label: '点差宝', direction: '/dcpage' },
    ],
  },
  [SYS_DWB]: {
    asset: [
      { name: 'allCash', label: '总资产' },
      { name: 'availableCash', label: '可用资金' },
      { name: 'frozenCash', label: '占用合约定金' },
      { name: 'cashEarnAll', label: '持仓盈亏' },
    ],
    channel: [
      { name: 'hold', label: '当前持仓', direction: '/hold' },
      { name: 'gold', label: '出入金', direction: '/gold' },
      { name: 'userCenter', label: '个人设置', direction: '/userSet' },
      { name: 'dcpage', label: '点微宝', direction: '/dcpage' },
    ],
  },
};

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemInfo: PropTypes.object.isRequired,
  };

  clickFunc = (type) => () => {
    if (type === 1) {
      const loginObj = {
        orgId: '81',
        mobile: '18928488102',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        systemType: 'ios',
      };
      this.props.dispatch(login(loginObj));
      // SysApi.getUserData({ userID: '2222222', ttt: '33333', ddd: 'ccc' });
      SysApi.getSysConfig();
      // SysApi.getSysConfig();
    }
    if (type === 2) this.props.dispatch(logout());
  };

  render() {
    const {
      systemInfo: {
        systemType, assetInfo, isLogin, avatarURL, nickName, checkChannel,
      },
    } = this.props;
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
                  <button><Link to="/register"><span>注册</span></Link></button>
                  <button><Link to="/login"><span>登录</span></Link></button>
                </div>
            }
          </div>
          <ol className="table" styleName="asset">
            {
              renderList[systemType].asset.map((assetItem) => {
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
                <li key={channel.type} className="td" styleName={`channel-${channel.type}`}>
                  <Link to={channel.direction}>{channel.label}</Link>
                </li>
              ))
            }
          </ol>) : null
        }
        <div styleName="links">
          <ul>
            {
              renderList[systemType].channel.map((channeLitm) => (
                <Link key={channeLitm.name} to={channeLitm.direction}>
                  <li styleName={`channel-${channeLitm.name}`} >
                    <img src="1.png" alt="" /><span>{channeLitm.label}</span>
                  </li>
                </Link>
              ))
            }
          </ul>
        </div>
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

export default connect(mapStateToProps)(User);

