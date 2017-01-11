/**
 * Created by dell on 2016/12/27.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './gold.scss';
import { SYS_DCB, SYS_DWB } from '../../server/define';
import TopReturn from '../../components/topTeturn/topReturn';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Gold extends Component {
  static defaultProps = {
    title: '出入金记录',
  };
  static propTypes = {
    title: PropTypes.string,
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
  render() {
    return (
      <div styleName="gold">
        <TopReturn title={this.props.title} />
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

