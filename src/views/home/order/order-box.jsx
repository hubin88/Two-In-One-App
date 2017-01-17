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
    commodityId: PropTypes.string,
  };

  static defaultProps = {
    title: '建仓',
  };

  onConfirm = () => {
    if (this.props.onConfirm) {
      const settingData = this.order.getSettingData();
      this.props.onConfirm(settingData);
    }
    this.dialog.close();
  };

  renderSetting() {
    const { systemType, direction, commodityData, commodityId } = this.props;
    const o = {
      [SYS_DCB]: <OrderDCB
        ref={(ref) => { this.order = ref; }}
        direction={direction}
        commodity={commodityData[commodityId]}
      />,
      [SYS_DWB]: <OrderDWB
        ref={(ref) => { this.order = ref; }}
        direction={direction}
        commodity={commodityData[commodityId]}
      />,
    };
    return o[systemType];
  }

  renderButtons() {
    if (this.props.onConfirm) {
      return (<div className="table" styleName="buttons">
        <button className="td" styleName="button close" onClick={() => this.dialog.close()}>取消
        </button>
        <button
          className="td"
          styleName={`button confirm ${this.props.direction}`}
          onClick={this.onConfirm}
        >确定
        </button>
      </div>);
    }
    return null;
  }

  renderTitle() {
    return (<span styleName={this.props.direction}>
      <i className="td" />
      <b className="td">{this.props.title}</b>
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
