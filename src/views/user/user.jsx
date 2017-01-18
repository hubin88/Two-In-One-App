import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './user.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';

const renderList = {
  [SYS_DCB]: {
    asset: [
      { name: 'TotalAssets', label: '总资产' },
      { name: 'ValidAssets', label: '可用资金' },
      { name: 'TotalUsed', label: '占用合约定金' },
    ],
    channel: [
      { name: 'gold', label: '出入金', direction: '/gold', images: 'me_icon_record@2x.png' },
      { name: 'userCenter', label: '个人设置', direction: '/userSet', images: 'me_icon_set@2x.png' },
      { name: 'dcpage', label: '点差宝', direction: '/dcbPage', images: 'me_icon_rules@2x.png' },
    ],
  },
  [SYS_DWB]: {
    asset: [
      { name: 'TotalAssets', label: '总资产' },
      { name: 'ValidAssets', label: '可用资金' },
      { name: 'TotalUsed', label: '占用合约定金' },
      { name: 'cashEarnAll', label: '持仓盈亏' },
    ],
    channel: [
      { name: 'hold', label: '当前持仓', direction: '/hold', images: 'me_icon_cz@2x.png' },
      { name: 'gold', label: '出入金', direction: '/gold', images: 'me_icon_record@2x.png' },
      { name: 'userCenter', label: '个人设置', direction: '/userSet', images: 'me_icon_set@2x.png' },
      { name: 'dcpage', label: '点微宝', direction: '/dwbPage', images: 'me_icon_rules@2x.png' },
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

  render() {
    const {
      systemInfo: {
        systemType, assetInfo, isLogin, avatarURL, nickName, checkChannel,
      },
    } = this.props;
    return (
      <div styleName="user">
        <div styleName="info">
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
                  <li styleName={`channel-${channel.type}`}>
                    {channel.label}
                  </li>
                </Link>
              ))
            }
          </ol>) : null
        }
        <div styleName="links">
          <ul>
            {
              renderList[systemType].channel.map((channeLitm) => (
                <Link key={channeLitm.name} to={channeLitm.direction}>
                  <li styleName={`channel-${channeLitm.name}`}>
                    <img src={require(`../../images/${channeLitm.images}`)}
                         alt="" /><span>{channeLitm.label}</span>
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

