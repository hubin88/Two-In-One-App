import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Table from '../../components/table/table';
import Quotes from './quotes/quotes';
import OrderBox from './order/order-box';
import styles from './home.scss';
import holdStyles from './hold-table.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';
import AppConfig, { styleConfig } from '../../server/app-config';
import CloseOut from '../../components/close-out/close-out';
import { toCreateUserOrder, queryUserInfoGatewayReapt } from '../../model/action';
import { requestGetQuot } from '../../model/market/action-market';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends Component {
  static defaultProps = {};
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object,
    marketInfo: PropTypes.object,
    systemInfo: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      holdBody: [],
    };
  }

  componentDidMount() {
    this.avatar.addEventListener('touchend', this.onClickAvatar);
  }

  componentWillUnmount() {
    if (this.timeGetQuto) clearInterval(this.timeGetQuto);
    this.avatar.removeEventListener('touchend', this.onClickAvatar);
  }

  onCover = (d) => {
    const de = d;
    de.float = 22;
    CloseOut.show(de);
  };

  onClickAvatar = (e) => {
    e.preventDefault();
    browserHistory.push('/user');
  };

  confirmBuild = (data) => {
    const orderData = {
      // sessionId: '',
      marketId: '',
      symbolId: '',
      direction: '',
      volume: '',
      bsType: '',   // DWB 订单类型 1 现金2 金币，默认现金
      stopWin: '',  // DWB
      stopLoss: '', // DWB
      margin: '',   // DCB
      point: '',    // DCB
      data,
    };
    this.props.dispatch(toCreateUserOrder(orderData, this.quotes.redrawCanvas));
  };

  showOrder = (title, direction, systemType) => {
    if (this.props.systemInfo.isLogin) {
      const {
        exchangeInfo: { commodityData },
        systemInfo: { commodityId },
        marketInfo: { commodityPrices },
      } = this.props;
      OrderBox.show({
        dispatch: this.props.dispatch,
        title,
        direction,
        systemType,
        onConfirm: this.confirmBuild,
        commodityData,
        commodityId,
        commodityPrices,
      });
    } else {
      browserHistory.push('/login?source=home');
    }
  };

  // 持仓记录头部
  holdHeaderList = (systemType) => {
    const obj = {
      [SYS_DCB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span styleName={`${d.direction}`}><i />{d.Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        { key: 'Price', label: '建仓价' },
        { key: 'deposit', label: '定金' },
        { key: 'floatPoint', label: '止盈止损' },
      ],
      [SYS_DWB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span styleName={`${d.direction}`}><i />{d.Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        { key: 'Price', label: '建仓价' },
        { key: 'float', label: '盈亏' },
        {
          key: 'cover',
          label: '操作',
          render: (keyData, d) => (
            <span><a href="#" onTouchTap={() => this.onCover(d)}>平仓</a></span>
          ),
        },
      ],
    };
    return obj[systemType];
  };

  render() {
    const {
      dispatch,
      exchangeInfo: { commodityData, secKey },
      marketInfo: { normalday, commodityPricesOld, commodityPrices },
      systemInfo: {
        systemType,
        assetInfo: { allAssets },
        holdArray,
        isLogin,
        avatarURL,
        checkChannel,
        commodityId,
      },
    } = this.props;
    const commodityCode = commodityData[commodityId] ? commodityData[commodityId].MerchCode : null;
    const holdArr = holdArray.filter((i) => i.MerchCode === commodityCode);
    const allAssetsNum = isLogin ? allAssets : '- -';
    const hasHold = holdArr && holdArr.length > 0;
    const holdHeaderH = hasHold ? styleConfig.holdHeaderH : 0;
    const holdNum = hasHold && holdArr.length > 2 ? 2 : holdArr.length;
    const holdHeight = (styleConfig.holdBaseH * holdNum) + holdHeaderH;
    const commodityKey = Object.keys(commodityData);
    if (isLogin && secKey) {
      clearInterval(this.time);
      this.time = setInterval(() => {
        dispatch(queryUserInfoGatewayReapt(secKey));
      }, repeatTime.userInfo);
    }
    if (commodityKey) {
      clearInterval(this.timeGetQuto);
      this.timeGetQuto = setInterval(() => {
        dispatch(requestGetQuot(null, commodityKey));
      }, repeatTime.getQuot);
    }
    return (
      <div styleName="home">
        <div
          styleName="user-info"
          style={{ height: styleConfig.userInfoH, lineHeight: `${styleConfig.userInfoH}px` }}
        >
          <span styleName="avatar" ref={(ref) => { this.avatar = ref; }}>
            <img src={avatarURL} alt="" />
          </span>
          <span styleName="asset">
            总资产<span>{allAssetsNum}</span>元
          </span>
          <span className="fr">
            {
              checkChannel.map((channel) => (
                <button key={channel.type} styleName={`channel-${channel.type}`}>
                  <Link to={channel.direction}>{channel.label}</Link>
                </button>))
            }
          </span>
        </div>
        <div
          styleName="trade"
        >
          <div styleName="market">
            <Quotes
              ref={(ref) => { this.quotes = ref; }}
              dispatch={dispatch}
              commodityData={commodityData}
              commodityPrices={commodityPrices}
              commodityPricesOld={commodityPricesOld}
              holdHeight={holdHeight}
              normalday={normalday}
              commodityId={commodityId}
              systemType={systemType}
            />
          </div>
          <div
            styleName="building"
            style={{
              height: styleConfig.buildingH,
              padding: styleConfig.buildingP,
            }}
          >
            {
              ['bullish', 'bearish'].map((direction, idx) => {
                const title = `${AppConfig.tradeLabel()[systemType][direction]}`;
                return (
                  <button
                    style={{
                      height: styleConfig.buildingH - (2 * styleConfig.buildingP),
                      lineHeight: `${styleConfig.buildingH - (2 * styleConfig.buildingP)}px`,
                    }}
                    key={`building-${idx}`}
                    styleName={direction}
                    onTouchTap={() => this.showOrder(title, direction, systemType)}
                  >{title}</button>
                );
              })
            }
          </div>
          <span
            styleName="tips"
            style={{ height: styleConfig.tipsH, lineHeight: `${styleConfig.tipsH}px` }}
          >
            交易时间:周一至周五08:00-次日04:00 每日04:30-07:00休市结算
          </span>
        </div>
        <div styleName="hold" style={{ height: holdHeight }}>
          {
            holdArr && holdArr.length >= 0 ? <Table
              ref={(ref) => { this.table = ref; }}
              fields={this.holdHeaderList(systemType)}
              data={holdArr}
              styles={holdStyles}
            /> : null
          }
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    marketInfo: state.marketInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Home);
