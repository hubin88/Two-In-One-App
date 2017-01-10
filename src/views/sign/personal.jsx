/**
 * Created by admin on 2016/12/29.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getQueryString } from '../../server/tools';

import '../../css/main.scss'; // import global css style

class Persponal extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowHeader: !getQueryString('showTop'), //是否显示头部标题
    };
  }

  back = () => {
    window.history.go(-1);
  };

  render() {
    const { systemInfo, exchangeInfo: { systemList } } = this.props;
    let titleName = null;
    Object.values(systemList).forEach((val) => {
      if (val.type === systemInfo.systemType) {
        titleName = val.label;
        return;
      }
    });
    return (
      <div className="content" ref={(ref) => { this.content = ref; }}>
        {this.state.isShowHeader ? <div className="header">
          <input type="button" className="back" onClick={() => { this.back(); }} />
          {titleName}
        </div> : null}
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(Persponal);
