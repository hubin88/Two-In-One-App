/**
 * Created by dell on 2016/12/27.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './gold.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Gold extends Component {
  static propTypes = {
    title: '',
    systemInfo: PropTypes.object.isRequired,
    onCloseCallback: PropTypes.func,
  };

  setValue = () => {
    let tab = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tab = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="mainLeft">资金调整</div>
            <div styleName="mainRight">
              <b>订单号：</b><b>X</b>
            </div>
            <div styleName="mainLeft"><i>图片</i><span>21</span></div>
            <div styleName="mainRight"><i>建仓时间</i></div>
          </div>
          <div styleName="notMore">没有更多</div>
        </div>
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      tab = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="mainLeft">资金调整</div>
            <div styleName="mainRight">
              <b>订单号：</b><b>X</b>
            </div>
            <div styleName="mainLeft"><i>图片</i><span>21</span></div>
            <div styleName="mainRight"><i>建仓时间</i></div>
          </div>
        </div>
      );
    }
    return tab;
  };

  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };

  render() {
    return (
      <div styleName="gold">
        <input type="button" styleName="close" onClick={this.toUpper} />
        <div styleName="titleName">
          <span>出入金记录</span>
        </div>
        {this.setValue()}
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

export default connect(mapStateToProps)(Gold);

