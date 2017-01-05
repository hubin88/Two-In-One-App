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

  bottomList = () => {
    let bottomList = '';
    if (this.props.systemInfo.systemType === 'DCB') {
      bottomList = (
        <ul>
          <Link to="/gold"><li><img src="1.png" alt="" /><span>出入金</span></li></Link>
          <Link to="/register"><li><img src="1.png" alt="" /><span>个人设置</span></li></Link>
          <Link to="/dcpage">
            <li styleName="itemName"><img src="1.png" alt="" /><span>点差宝介绍</span></li>
          </Link>
        </ul>
      );
    }
    if (this.props.systemInfo.systemType === 'DWB') {
      bottomList = (
        <ul>
          <Link to="/gold"><li><img src="1.png" alt="" /><span>当前持仓</span></li></Link>
          <Link to="/gold"><li><img src="1.png" alt="" /><span>出入金</span></li></Link>
          <Link to="/register"><li><img src="1.png" alt="" /><span>个人设置</span></li></Link>
          <Link to="/dwpage">
            <li styleName="itemName"><img src="1.png" alt="" /><span>点微宝介绍</span></li>
          </Link>
        </ul>
      );
    }
    return bottomList;
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
                  <button><Link to="/register"><span>注册</span></Link></button>
                  <button><Link to="/login"><span>登录</span></Link></button>
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
          {this.bottomList()}
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

