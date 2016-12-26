import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './user.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class User extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemInfo: PropTypes.object.isRequired,
  };

  render() {
    const { systemInfo: { assetInfo, isLogin, avatarURL, userName } } = this.props;
    return (
      <div styleName="user">
        <div styleName="info">
          <div style={{ position: 'fixed', top: '10px', left: '10px' }}>
            <Link to="/pay"><span>充值</span></Link>
            <Link to="/withdraw"><span>提现</span></Link>
          </div>
          <div styleName="avatar">
            <img src={avatarURL} />
          </div>
          <div styleName="middle">
            {
              isLogin ?
                <div><span>{userName}</span></div> :
                <div>
                  <button><Link to="/join"><span>注册</span></Link></button>
                  <button><Link to="/login"><span>登录</span></Link></button>
                </div>
            }
          </div>
          <ol className="table" styleName="asset">
            {
              assetInfo.map((assetItem) => (
                <li key={assetItem.name} className="td" styleName="asset-item">
                  <span styleName="asset-amount">{isLogin ? assetItem.amount : '- -'}</span>
                  <span styleName="asset-name">{assetItem.label}</span>
                </li>
              ))
            }

          </ol>
        </div>
        <div styleName="links"></div>
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

