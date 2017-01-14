import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Table from '../../components/table/table';
import Quotes from './quotes/quotes';
import OrderBox from './order/order-box';
import styles from './home.scss';
import holdStyles from './hold-table.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';
import AppConfig from '../../server/app-config';

const holdRecord = {
  [SYS_DCB]: [
    { name: '亚太银', mount: '2', openPrice: '3732', earnest: '10.00', range: '5' },
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
    commodityState: PropTypes.object,
    systemInfo: PropTypes.object,
  };


  constructor(props) {
    super(props);
    this.state = {
      holdHeight: 0,
      holdBody: [],
    };
  }

  onCover = (d) => {
    console.log('平仓', d);
  };

  haveHold = (systemType) => {
    this.setState({
      holdHeight: 90,
      holdBody: holdRecord[systemType],
    });
  };

  confirmBuild() {
    console.log('下单成功');
  }

  showOrder = (title, direction, systemType) => {
    OrderBox.show({
      dispatch: this.props.dispatch,
      title,
      direction,
      systemType,
      onConfirm: this.confirmBuild,
      commodityData: this.props.exchangeInfo.commodityData,
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
      marketInfo: { commodityPrices },
      commodityState: { commodityId },
      systemInfo: { systemType, assetInfo, isLogin, avatarURL, checkChannel },
    } = this.props;

    const allCash = isLogin && (assetInfo.TotalAssets >= 0) ? assetInfo.TotalAssets : '- -';

    return (
      <div styleName="home">
        <div style={{ position: 'fixed', top: '5px', left: '10px' }}>
          <button onClick={() => this.haveHold(systemType)}>显示持仓</button>
        </div>
        <div styleName="user-info">
          <span styleName="avatar">
            <img src={avatarURL} alt="" />
          </span>
          <span styleName="asset">
            总资产<b>{allCash}</b>元
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
        <div styleName="trade" style={{ bottom: `${this.state.holdHeight}` }}>
          <div styleName="market">
            <Quotes
              dispatch={dispatch}
              commodityId={commodityId}
              commodityData={commodityData}
              commodityPrices={commodityPrices}
            />
          </div>
          <div styleName="building">
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
          <div styleName="tips">
            <span>交易时间:周一至周五08:00-次日04:00 每日04:30-07:00休市结算</span>
          </div>
        </div>
        <div styleName="hold" style={{ height: `${this.state.holdHeight}` }}>
          {
            <Table
              ref={(ref) => { this.table = ref; }}
              fields={this.holdHeaderList(systemType)}
              data={this.state.holdBody}
              className="txt-center"
              styles={holdStyles}
            />
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
    commodityState: state.commodityState,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Home);

