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

  onCover = (d) => {
    d.float = 22;
    CloseOut.show(d);
  };
  clickAvatar = () => {
    if (this.props.systemInfo.isLogin) {
      browserHistory.push('/user');
    } else {
      browserHistory.push('/login?source=user');
    }
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
    const {
      exchangeInfo: { commodityData },
      systemInfo: { commodityId },
      marketInfo: { commodityPricesObj },
    } = this.props;
    OrderBox.show({
      dispatch: this.props.dispatch,
      title,
      direction,
      systemType,
      onConfirm: this.confirmBuild,
      commodityData,
      commodityId,
      commodityPricesObj,
    });
  };
  // 持仓记录头部
  holdHeaderList = (systemType) => {
    const {
      exchangeInfo: { commodityData },
      systemInfo: { commodityId },
    } = this.props;

    // const mountUnit = cid => cid === COMMODITY_BU ? AMOUNT_UNIT_BU : AMOUNT_UNIT_OTHERS;

    const obj = {
      [SYS_DCB]: [
        {
          key: 'name',
          label: '名称',
          render: () => (
            <span><img src="" alt="" />{commodityData[commodityId].Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        // {
        //   key: 'volume',
        //   label: '数量',
        //   render: (data) => (
        //     <span>{ data.valiableAsset.asset * mountUnit(data.AssentId)}</span>
        //   ),
        // },
        { key: 'Price', label: '建仓价' },
        { key: 'earnest', label: '定金' },
        { key: 'range', label: '止盈止损' },
      ],
      [SYS_DWB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span styleName={`${d.direction}`}><i />{commodityData[commodityId].Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        // {
        //   key: 'volume',
        //   label: '数量',
        //   render: (data) => (
        //     <span>{ data.valiableAsset.asset * mountUnit(data.AssentId)}</span>
        //   ),
        // },
        { key: 'Price', label: '建仓价' },
        { key: 'float', label: '盈亏' },
        {
          key: 'cover',
          label: '操作',
          render: (keyData, d) => (
            <a href="#" onClick={() => this.onCover(d)}>平仓</a>
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
      marketInfo: { commodityPrices, normalday },
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
    const hasHold = holdArr && holdArr.length !== 0;
    const holdHeight = hasHold ? styleConfig.holdH : 0;
    const commodityKey = Object.keys(commodityData);
    if (isLogin && secKey) {
      clearInterval(this.time);
      this.time = setInterval(() => {
        dispatch(queryUserInfoGatewayReapt(secKey));
      }, 60000);
    }
    if (commodityKey) {
      clearInterval(this.timeGetQuto);
      this.timeGetQuto = setInterval(() => {
        dispatch(requestGetQuot(null, commodityKey));
      }, 500000);
    }

    return (
      <div styleName="home">
        <div
          styleName="user-info"
          style={{ height: styleConfig.userInfoH, lineHeight: `${styleConfig.userInfoH}px` }}
        >
          <span styleName="avatar" onClick={this.clickAvatar}>
            <img src={avatarURL} alt="" />
          </span>
          <span styleName="asset">
            总资产<b>{allAssetsNum}</b>元
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
              holdHeight={holdHeight}
              normalday={normalday}
              commodityId={commodityId}
            />
          </div>
          <div
            styleName="building"
            style={{
              height: styleConfig.buildingH,
              padding: styleConfig.buildingPadding,
            }}
          >
            {
              ['bullish', 'bearish'].map((direction, idx) => {
                const title = `${AppConfig.tradeLabel()[systemType][direction]}`;
                return (
                  <button
                    style={{
                      height: styleConfig.buildingH - (2 * styleConfig.buildingPadding),
                      lineHeight: `${styleConfig.buildingH - (2 * styleConfig.buildingPadding)}px`,
                    }}
                    key={`building-${idx}`}
                    styleName={direction}
                    onClick={() => this.showOrder(title, direction, systemType)}
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
            hasHold ? <Table
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
