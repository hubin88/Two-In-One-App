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
import { toCreateUserOrder } from '../../model/action';

const holdRecord = {
  [SYS_DCB]: [
    {
      name: '亚太银',
      mount: '2',
      openPrice: '3732',
      earnest: '10.00',
      range: '5',
      MerchCode: 'BU.QHDW',
    },
    { name: '亚银', mount: '2', openPrice: '3732', earnest: '10.00', range: '5' },
    { name: '亚太银', mount: '2', openPrice: '3732', earnest: '10.00', range: '5' },
    { name: '亚太银', mount: '2', openPrice: '3732', earnest: '10.00', range: '5' },
  ],
  [SYS_DWB]: [
    { name: '亚太银', mount: '2', openPrice: '3732', float: '-5' },
    { name: '亚银', mount: '2', openPrice: '3732', float: '-5' },
    { name: '亚太银', mount: '2', openPrice: '3732', float: '-5' },
    { name: '亚太银', mount: '2', openPrice: '3732', float: '-5' },
  ],
};

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends Component {
  static defaultProps = {};

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object,
    marketInfo: PropTypes.object,
    systemInfo: PropTypes.object,
    commodityState: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      holdBody: [],
    };
  }

  onCover = (d) => {
    console.log('平仓', d);
  };

  clickAvatar = () => {
    if (this.props.systemInfo.isLogin) {
      browserHistory.push('/user');
    } else {
      browserHistory.push('/login?source=user');
    }
  };

  haveHold = (systemType) => {
    this.setState({
      holdBody: holdRecord[systemType],
    }, () => { this.quotes.redrawCanvas(); });
  };
  confirmBuild = (data) => {
    const orderData = {
      sessionId: '',
      marketId: '',
      symbolId: '',
      direction: '',
      volume: '',
      bsType: '',   // DWB 订单类型 1 现金2 金币，默认现金
      stopWin: '',  // DWB
      stopLoss: '', // DWB
      margin: '',   // DCB
      point: '',    // DCB
    };
    // TODO: 未完成，开发调试用
    const i = 0;
    if (i === 0) {
      this.haveHold(this.props.systemInfo.systemType);
    } else {
      this.props.dispatch(toCreateUserOrder(orderData));
    }
    console.log('下单成功', data);
  };

  showOrder = (title, direction, systemType) => {
    const {
      exchangeInfo: { commodityData },
      commodityState: { commodityId },

    } = this.props;

    OrderBox.show({
      dispatch: this.props.dispatch,
      title,
      direction,
      systemType,
      onConfirm: this.confirmBuild,
      commodityData,
      commodityId,
    });
  };

  // 持仓记录头部
  holdHeaderList = (systemType) => {
    const obj = {
      [SYS_DCB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span><img src="" alt="" />{d.name}</span>
          ),
        },
        { key: 'mount', label: '数量' },
        { key: 'openPrice', label: '建仓价' },
        { key: 'earnest', label: '定金' },
        { key: 'range', label: '止盈止损' },
      ],
      [SYS_DWB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span><img src="" alt="" />{d.name}</span>
          ),
        },
        { key: 'mount', label: '数量' },
        { key: 'openPrice', label: '建仓价' },
        { key: 'float', label: '盈亏' },
        {
          key: '',
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
      exchangeInfo: { commodityData },
      marketInfo: { commodityPrices, normalday },
      systemInfo: {
        systemType,
        assetInfo: { TotalAssets: allCash, vec: holdArr2 },
        isLogin,
        avatarURL,
        checkChannel,
      },
      commodityState: { commodityId },
    } = this.props;
    console.log(holdArr2);
    const holdArr = this.state.holdBody;
    const allCashNum = isLogin ? allCash : '- -';
    const hasHold = holdArr && holdArr.length !== 0;
    const holdHeight = hasHold ? styleConfig.holdH : 0;
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
            总资产<b>{allCashNum}</b>元
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
            style={{ height: styleConfig.buildingH }}
          >
            {
              ['bullish', 'bearish'].map((direction, idx) => {
                const title = `${AppConfig.tradeLabel()[systemType][direction]}`;
                return (
                  <span
                    key={`building-${idx}`}
                    styleName={direction}
                    onClick={() => this.showOrder(title, direction, systemType)}
                  >{title}</span>
                );
              })
            }
          </div>
          <div styleName="tips" style={{ height: styleConfig.tipsH }}>
            <span>交易时间:周一至周五08:00-次日04:00 每日04:30-07:00休市结算</span>
          </div>
        </div>
        <div styleName="hold" style={{ height: holdHeight }}>
          {
            hasHold ? <Table
              ref={(ref) => { this.table = ref; }}
              fields={this.holdHeaderList(systemType)}
              data={holdArr.filter((i) => i.MerchCode === commodityId)}
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
    commodityState: state.commodityState,
  };
}

export default connect(mapStateToProps)(Home);

