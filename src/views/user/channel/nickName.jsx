/**
 * Created by dell on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './nickName.scss';
import { SYS_DCB, SYS_DWB } from '../../../server/define';
import TopReturn from '../../../components/topTeturn/topReturn';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class NickName extends Component {
  static defaultProps = {
    title: '昵称修改',
    ifSure: true,
    value: '131',
  };
  static propTypes = {
    onCloseCallback: PropTypes.func,
    systemInfo: PropTypes.object,
    title: PropTypes.string,
    ifSure: PropTypes.bool,
    sureClick: PropTypes.func,
    value: PropTypes.string,
  };

  sureFun = () => {
    alert(1111);
  };
  clearName = () => {
    this.nameValue.value = '';
  };
  nameCenter = () => {
    let tpl = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tpl = (
        <div styleName="nameCenter">
          <span>昵称</span>
          <input
            type="text"
            defaultValue={this.props.value}
            ref={(ref) => { this.nameValue = ref; }}
          />
          <b onClick={this.clearName}>×</b>
        </div>
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      tpl = (
        <div styleName="nameCenter">
          <span>昵称</span>
          <input type="text" defaultValue={this.props.value} />
        </div>
      );
    }
    return tpl;
  };

  render() {
    return (
      <div styleName="nickName">
        <TopReturn title={this.props.title} ifSure={this.props.ifSure} sureClick={this.sureFun} />
        {this.nameCenter()}
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

export default connect(mapStateToProps)(NickName);

