/**
 * Created by Amg on 2017/1/12.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './order-box.scss';
import dialogStyles from './order-dialog.scss';
import Dialog from '../../../components/dialog/dialog';
import { insertComponent } from '../../../ultils/helper';
import OrderDCB from './order-dcb';
import OrderDWB from './order-dwb';
import { SYS_DCB, SYS_DWB } from '../../../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class OrderBoxWrap extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemType: PropTypes.string,
    direction: PropTypes.string,
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    commodityData: PropTypes.object,
    commodityPricesObj: PropTypes.object,
    commodityId: PropTypes.string,
  };

  static defaultProps = {
    title: '建仓',
  };

  componentDidMount() {
    this.closeBtn.addEventListener('touchend', this.dialog.close);
    this.confirmBtn.addEventListener('touchend', this.onConfirm);
  }

  componentWillUnmount() {
    this.closeBtn.removeEventListener('touchend', this.dialog.close);
    this.confirmBtn.removeEventListener('touchend', this.onConfirm);
  }

  onConfirm = (e) => {
    // console.log(e);
    e.preventDefault();

    if (this.props.onConfirm) {
      const settingData = { ...this.order.getSettingData() };
      this.props.onConfirm(settingData);
    }
    this.dialog.close(e);
  };

  renderSetting() {
    const { systemType, direction, commodityData, commodityId, commodityPricesObj } = this.props;
    const commodity = {
      ...commodityData[commodityId],
      price: commodityPricesObj[commodityId],
    };
    const o = {
      [SYS_DCB]: <OrderDCB
        ref={(ref) => { this.order = ref; }}
        direction={direction}
        commodity={commodity}
      />,
      [SYS_DWB]: <OrderDWB
        ref={(ref) => { this.order = ref; }}
        direction={direction}
        commodity={commodity}
      />,
    };
    return o[systemType];
  }

  renderButtons() {
    if (this.props.onConfirm) {
      return (<div className="table" styleName="buttons">
        <button
          className="td"
          styleName="button close"
          ref={(ref) => { this.closeBtn = ref; }}
        >取消
        </button>
        <button
          className="td"
          styleName={`button confirm ${this.props.direction}`}
          ref={(ref) => { this.confirmBtn = ref; }}

        >确定
        </button>
      </div>);
    }
    return null;
  }

  renderTitle() {
    return (<span styleName={this.props.direction}>
      <i className="td" />
      <span className="td">{this.props.title}</span>
    </span>);
  }

  render() {
    return (
      <Dialog
        ref={(ref) => { this.dialog = ref; }}
        title={this.renderTitle()}
        styles={dialogStyles}
      >
        {this.renderSetting()}
        {this.renderButtons()}
        <span styleName="prompt">
          温馨提示: 收盘时对于未成交订单将自动平成，合约定金全额返还
        </span>
      </Dialog>
    );
  }
}

export default class OrderBox extends OrderBoxWrap {
  static show = (param, style = undefined) => {
    insertComponent(
      <OrderBoxWrap
        {...param} style={style}
      />
    );
  };
}
