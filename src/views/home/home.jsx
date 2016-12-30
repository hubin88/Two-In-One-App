import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import Hold from '../../components/hold/hold';
import Property from './property';
import Chart from './chart';
import styles from './home.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Home extends Component {
  static defaultProps = {};
  state = {
    hold: false,
    holdHeader: [],
    holdRecoder: [],
    holdKey: [],
  };

  // 模拟数据 ##################################################
  holdHeader = {
    dcb: ['名称', '数量', '建仓价', '定金', '止盈止损'],
    dwb: ['名称', '数量', '建仓价', '盈亏', '操作'],
  }
  holdRecoder = {
    dcb: [
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
    ],
    dwb: [
      { a: '亚太银', b: '2', c: '3732', d: '-5' },
      { a: '亚太银', b: '2', c: '3732', d: '-5' },
      { a: '亚太银', b: '2', c: '3732', d: '-5' },
    ],
  }
  holdKey = {
    dcb: ['a', 'b', 'c', 'd', 'e'],
    dwb: ['a', 'b', 'c', 'd'],
  }
  // ###########################################

  haveHold = (str) => {
    if (this.state.hold) {
      this.setState({ hold: false, holdHeader: [], holdRecoder: [], holdKey: [] });
      return;
    }
    this.setState({
      hold: true,
      holdHeader: this.holdHeader[str],
      holdRecoder: this.holdRecoder[str],
      holdKey: this.holdKey[str],
    });
    return;
  }

  // 根据首页持仓列表计算分时图高度
  chartHeight = () => {
    if (this.state.holdRecoder.length >= 2) return '55%';
    if (this.state.holdRecoder.length === 1) return '60%';
    return '70%';
  }

  renderBuildingButton() {
    return (
      <div styleName="building-button">
        <img src="" alt="" />
        <span styleName="bullish" onClick={() => this.haveHold('dcb')}>看涨</span>
        <span styleName="bearish" onClick={() => this.haveHold('dwb')}>看跌</span>
      </div>
    );
  }

  // 如果持仓大于零 显示持仓列表
  renderHold() {
    if (this.state.holdRecoder.length > 0) {
      return (
        <Hold
          holdHeader={this.state.holdHeader}
          holdRecoder={this.state.holdRecoder}
          holdKey={this.state.holdKey}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div styleName="home">
        <Property />
        <Chart chartHeight={this.chartHeight()} />
        {this.renderBuildingButton()}
        <div styleName="exchange-hour">
          <img src="" alt="" />
          <span>交易时间:周一至周五08:00-次日04:00 每日04:30-07:00休市结算</span>
        </div>
        {this.renderHold()}
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

export default connect(mapStateToProps)(Home);

