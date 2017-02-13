import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import CloseOut from '../../../components/close-out/close-out';
import styles from './track.scss';
import { SYS_DCB, SYS_DWB } from '../../../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })

class Track extends Component {
  static propTypes = {
    value: PropTypes.string,
    systemInfo: PropTypes.object.isRequired,
    title: PropTypes.string,
  };
  static defaultProps = {
    title: '交易轨迹',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  onCover = () => {
    const de = {};
    de.float = 22;
    CloseOut.show(de);
  };

  setTrackValue = () => {
    let tpls = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      tpls = (
        <div styleName="main">
          <div styleName="mains">
            <div styleName="title">
              <b styleName="product">白银</b><b>0.1千克</b><b>手</b>
              <span styleName="cover">手动平仓</span>
            </div>
            <div><span styleName="icon">赚</span><span styleName="money">176</span></div>
            <div><i>建仓价</i><span>3.165</span></div>
            <div><i>建仓时间</i><span>2016-02-26 16:44</span></div>
            <div><i>平仓价</i><span>3.169</span></div>
            <div><i>平仓类型</i><span>手动平仓</span></div>
            <div><i>手续费</i><span>1.50</span></div>
            <div><i>交易方向</i><span>看涨</span></div>
            <div><i>定金</i><span>100</span></div>
            <div><i>止盈止损</i><span>21</span></div>
            <p>时间 2016-02-26 16:44</p>
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
              <b styleName="product">白银</b><b>0.1千克</b>
            </div>
            <div><span styleName="icon">赚</span><span styleName="money">176</span></div>
            <div><i>建仓价</i><span>3.165</span></div>
            <div><i>建仓时间</i><span>2016-02-26 16:44</span></div>
            <div><i>平仓价</i><span>3.169</span></div>
            <div><i>平仓类型</i><span>手动平仓</span></div>
            <div><i>手续费</i><span>1.50</span></div>
            <div><i>交易方向</i><span>看涨</span></div>
            <div><i>保证金</i><span>100</span></div>
            <p>时间 2016-02-26 16:44</p>
          </div>
          <div styleName="notMore">没有更多</div>
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

