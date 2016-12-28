/**
 * Created by yjzhme on 2016/12/22.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order.scss';

class Order extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    appState: PropTypes.object,
    close: PropTypes.func,
    state: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      subscription: ['100', '300', '500', '700'],
      currentSubscription: 0,
      dcbPoint: ['3', '5', '7'],
      currentDcbPoint: 0,
      monetary: ['100', '300', '500', '700', '1000', '2000'],
      currentMonetary: 0,
      dwbPoint: ['无', '10%', '20%', '30%', '40%', '50%'],
      currentDwbProfit: 0,
      currentDwbLoss: 0,
    };
  }


  componentDidMount() {
    const title = document.getElementById('title');
    const orderPanel = document.getElementById('order-panel');
    title.style.color = this.props.state.style;
    setTimeout(() => {
      orderPanel.style.height = '50%';
    }, 100);
  }

  componentDidUpdate() {
    const title = document.getElementById('title');
    title.style.color = this.props.state.style;
  }

  close = () => {
    const orderPanel = document.getElementById('order-panel');
    orderPanel.style.height = '0%';
    setTimeout(() => {
      this.props.close();
    }, 550);
  }

  chooseSubscription = (e) => {
    this.setState({ currentSubscription: e.target.value });
  }
  chooseDcbPoint = (e) => {
    this.setState({ currentDcbPoint: e.target.value });
  }
  chooseMonetary = (e) => {
    this.setState({ currentMonetary: e.target.value });
  }
  chooseDwbProfit = (e) => {
    this.setState({ currentDwbProfit: e.target.value });
  }
  chooseDwbLoss = (e) => {
    this.setState({ currentDwbLoss: e.target.value });
  }

  // 计算利润
  profit() {
    return 1000;
  }
  // 计算最大下单数
  maxOrderAmount() {
    return 5;
  }

  // 点差宝下单界面
  renderDcb() {
    const fontColor = `${this.props.state.type === '看涨' ? 'fontRed' : 'fontGreen'}`;
    const buttonColor = `${this.props.state.type === '看涨' ? 'buttonRed' : 'buttonGreen'}`;
    return (
      <div styleName="setting">
        <div styleName="dcb-subscription">
          <div styleName="dcb-setName"><span>合约定金:</span></div>
          <div styleName="dcb-subscription-list">
            <ul styleName="dcb-subscription-ul">
              {this.state.subscription.map((item, index) =>
                <li
                  styleName={this.state.currentSubscription === index ? `${buttonColor}` : 'not-current'} key={index}
                  value={index}
                  onClick={this.chooseSubscription}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div styleName="dcb-profit-loss-point">
          <div styleName="dcb-setName" ><span>止盈/止损点:</span></div>
          <div id="dcb-profit-loss-point-list" styleName="dcb-profit-loss-point-list">
            <ul styleName="dcb-profit-loss-point-ul">
              {this.state.dcbPoint.map((item, index) =>
                <li
                  styleName={this.state.currentDcbPoint === index ? `${buttonColor}` : 'not-current'} key={index}
                  value={index}
                  onClick={this.chooseDcbPoint}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div styleName="dcb-amount">
          <div styleName="dcb-setName" >数量:</div>
          <span>拖动条</span>
        </div>
        <div styleName="dcb-profit-tip">
          <div>
            有望盈利:<span styleName={`${fontColor}`}>{this.profit()}</span>元
            <span styleName="dcb-amount-tip">当前可下单最大数量{this.maxOrderAmount()}手</span>
          </div>
        </div>
        <div styleName="dcb-button">
          <span styleName="dcb-cancel" onClick={() => this.close()}>取消</span>
          <span styleName={`dcb-ensure ${buttonColor}`}>确定</span>
        </div>
        <div styleName="dcb-warm-prompt">
          温馨提示: 收盘时对于未成交订单将自动平成，合约定金全额返还
        </div>
      </div>
    );
  }
  // 点微宝下单界面
  renderDwb() {
    const fontColor = `${this.props.state.type === '看涨' ? 'fontRed' : 'fontGreen'}`;
    const buttonColor = `${this.props.state.type === '看涨' ? 'buttonRed' : 'buttonGreen'}`;
    return (
      <div styleName="setting">
        <div styleName="dwb-commodity-price">
          <span>购买<span styleName={`${fontColor}`}>1桶沥青</span>，市场价<span styleName={`${fontColor}`}>338.8</span>元</span>
        </div>
        <div styleName="dwb-monetary">
          <div styleName="dwb-setName">
            <span>购买金额(元)</span>
          </div>
          <div styleName="dwb-monetary-list">
            <ul styleName="dwb-monetary-ul">
              {this.state.monetary.map((item, index) =>
                <li
                  styleName={this.state.currentMonetary === index ? 'dwb-button-choose' : 'not-current'} key={index}
                  value={index}
                  onClick={this.chooseMonetary}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div styleName="dwb-factorage-tip">
          <span>
            手续费
            <span styleName={`${fontColor}`}>0.75元</span>
            （手续费单向收取）
            <span styleName={`${fontColor}`}>波动一个点，盈亏0.1元</span>
          </span>
        </div>
        <div styleName="dwb-profit-loss">
          <div styleName="dwb-setName"><span>止损</span></div>
          <div styleName="dwb-profit-loss-list">
            <ul styleName="dwb-profit-loss-ul">
              {this.state.dwbPoint.map((item, index) =>
                <li
                  styleName={this.state.currentDwbLoss === index ? 'dwb-button-choose' : 'not-current'} key={index}
                  value={index}
                  onClick={this.chooseDwbLoss}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
          <div styleName="dwb-setName"><span>止盈</span></div>
          <div styleName="dwb-profit-loss-list">
            <ul styleName="dwb-profit-loss-ul">
              {this.state.dwbPoint.map((item, index) =>
                <li
                  styleName={this.state.currentDwbProfit === index ? 'dwb-button-choose' : 'not-current'} key={index}
                  value={index}
                  onClick={this.chooseDwbProfit}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div styleName="dwb-warm-prompt">
          合理的止盈和止损，有利于锁定收益，降低风险
        </div>
        <div styleName="dwb-button">
          <span styleName="dwb-cancel" onClick={() => this.close()}>取消</span>
          <span styleName={`dwb-ensure ${buttonColor}`}>确定</span>
        </div>
        <div styleName="annotation">注：1.系统不支持持仓过夜，收盘没平仓将自动平仓</div>
      </div>
    );
  }

  renderSetting() {
    const product = this.props.state.product;
    if (product === 'dcb') {
      return this.renderDcb();
    } else if (product === 'dwb') {
      return this.renderDwb();
    }
    return null;
  }

  render() {
    return (
      <div styleName="order">
        <div styleName="close" onClick={() => this.close()}>{}</div>
        <div id="order-panel" styleName="order-panel">
          <div id="title" styleName="title"><sapn>{this.props.state.type}</sapn></div>
          <hr styleName="line" />
          {this.renderSetting()}
        </div>
      </div>
    );
  }
}


export default cssModules(Order, styles, { allowMultiple: true, errorWhenNotFound: false });
