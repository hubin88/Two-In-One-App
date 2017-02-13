import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './user.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';

const renderList = {
  [SYS_DCB]: {
    asset: [
      { name: 'allAssets', label: '总资产' },
      { name: 'validAssets', label: '可用资金' },
      { name: 'usedAssets', label: '占用合约定金' },
    ],
    channel: [
      { name: 'track', label: '交易轨迹', direction: '/track' },
      { name: 'gold', label: '出入金记录', direction: '/gold' },
      { name: 'set', label: '个人设置', direction: '/userSet' },
      { name: 'rule', label: '规则', direction: '/rule' },
      { name: 'intro', label: '点差宝介绍', direction: '/dcbPage' },
    ],
  },
  [SYS_DWB]: {
    asset: [
      { name: 'allAssets', label: '总资产' },
      { name: 'validAssets', label: '可用资金' },
      { name: 'usedAssets', label: '占用合约定金' },
      { name: 'cashEarnAll', label: '持仓盈亏' },
    ],
    channel: [
      { name: 'hold', label: '当前持仓', direction: '/hold' },
      { name: 'track', label: '交易轨迹', direction: '/track' },
      { name: 'gold', label: '出入金记录', direction: '/gold' },
      { name: 'set', label: '个人设置', direction: '/userSet' },
      { name: 'rule', label: '规则', direction: '/rule' },
      { name: 'intro', label: '点微宝介绍', direction: '/dwbPage' },
    ],
  },
};

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class User extends Component {
  static defaultProps = {};
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
  };

  componentDidMount() {
    this.avatar.addEventListener('touchend', this.onClickAvatar);
  }

  componentWillUnmount() {
    this.avatar.removeEventListener('touchend', this.onClickAvatar);
  }

  onClickAvatar = (e) => {
    e.preventDefault();
    browserHistory.push('/userSet');
  };

  onClickSign = (type) => () => {
    browserHistory.push(`${type}?source=user`);
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
          <div styleName="avatar" ref={(ref) => { this.avatar = ref; }}>
            <img src={avatarURL} alt="" />
          </div>
          <div styleName="middle">
            {
              isLogin ?
                <div><span>{nickName}</span></div> :
                <div>
                  <button onTouchTap={this.onClickSign('register')}>注册</button>
                  <button onTouchTap={this.onClickSign('login')}>登录</button>
                </div>
            }
          </div>
          <ol className="table" styleName="asset">
            {
              renderList[systemType].asset.map((assetItem) => {
                const amount = isLogin && (assetInfo[assetItem.name] >= 0) ?
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
                <Link to={channel.direction} key={channel.type} className="td">
                  <li>
                    <span styleName={`channel-${channel.type}`}>{channel.label}</span>
                  </li>
                </Link>
              ))
            }
          </ol>) : null
        }
        <div styleName="links">
          <ul>
            {
              renderList[systemType].channel.map((link) => (
                <Link key={link.name} to={link.direction}>
                  <li>
                    <span styleName={`link-${link.name}`}>{link.label}</span>
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

