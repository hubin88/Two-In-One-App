/**
 * Created by dell on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './modify-name.scss';
import { SYS_DCB, SYS_DWB } from '../../../../server/define';
import Header from '../../../../components/header/header';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class resetName extends Component {
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

  back() {
    browserHistory.push('/userSet');
  }

  submitFuc() {
    alert('111');
  }

  render() {
    return (
      <div styleName="nickName">
        <Header
          title={this.props.title}
          leftBtnCallBack={this.back}
          rightBtnCallBack={this.submitFuc}
        />
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

export default connect(mapStateToProps)(resetName);

