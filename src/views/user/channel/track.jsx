import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './track.scss';
import { SYS_DCB, SYS_DWB } from '../../../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })

class Track extends Component {
  static propTypes = {
    value: PropTypes.string,
    systemInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  setTrackValue = () => {
    let tpls = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tpls = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="title">
              <b>正元银</b><span>X</span>手<span>平仓</span>
            </div>
            <div>+176</div>
            <div><i>建仓价</i><span>21</span></div>
            <div><i>建仓时间</i><span>21</span></div>
            <div><i>平仓价</i><span>21</span></div>
            <div><i>平仓类型</i><span>21</span></div>
            <div><i>手续费</i><span>21</span></div>
            <div><i>交易方向</i><span>21</span></div>
            <div><i>定金</i><span>21</span></div>
            <div><i>止盈止损</i><span>21</span></div>
            <p>时间</p>
          </div>
          <div styleName="notMore">没有更多</div>
        </div>
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      tpls = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="title">
              <b>正元银</b><b>X</b>
            </div>
            <div>+176</div>
            <div><i>建仓价</i><span>21</span></div>
            <div><i>建仓时间</i><span>21</span></div>
            <div><i>平仓价</i><span>21</span></div>
            <div><i>平仓类型</i><span>21</span></div>
            <div><i>手续费</i><span>21</span></div>
            <div><i>交易方向</i><span>21</span></div>
            <div><i>保证金</i><span>21</span></div>
            <p>时间</p>
          </div>
        </div>
      );
    }
    return tpls;
  };

  render() {
    return (
      <div styleName="track">
        { this.setTrackValue() }
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

export default connect(mapStateToProps)(Track);
