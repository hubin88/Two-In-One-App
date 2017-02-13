/**
 * Created by Amg on 2017/2/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './drag.scss';

const changeDirect = {
  less: -1,
  more: 1,
};

class Drag extends Component {
  static defaultProps = {
    hasBtn: true,
    minNum: 0,
    maxNum: 100,
    step: 1,
    tipsShowTime: 1500,
  };

  static propTypes = {
    hasBtn: PropTypes.bool,
    tipsShowTime: PropTypes.number,
    minNum: PropTypes.number,
    maxNum: PropTypes.number,
    defaultNum: PropTypes.number,
    step: PropTypes.number,
    clsName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      nowNum: props.defaultNum || props.minNum,
    };
  }

  componentDidMount() {
    const rect = this.dragBox.getBoundingClientRect();
    this.dragStartX = rect.left.toFixed(2);
    this.dragEndX = rect.right.toFixed(2);
    // this.dragBlock.addEventListener('touchstart', (e) => this.touchStart(e));
    this.dragBlock.addEventListener('touchmove', (e) => this.touchMove(e));
    this.dragBlock.addEventListener('touchend', (e) => this.touchEnd(e));
    this.dragBox.addEventListener('touchstart', (e) => this.clickDragLine(e));
  }

  componentWillUnmount() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = null;
    // this.dragBlock.removeEventListener('touchstart', (e) => this.touchStart(e));
    this.dragBlock.removeEventListener('touchmove', (e) => this.touchMove(e));
    this.dragBlock.removeEventListener('touchend', (e) => this.touchEnd(e));
    this.dragBox.removeEventListener('touchstart', (e) => this.clickDragLine(e));
  }

  // touchStart = (e) => {
  //   e.preventDefault();
  //   const touch = e.touches[0] || e.changedTouches[0];
  //   this.startX = parseInt(touch.pageX, 10);
  //   this.nowNum = this.state.nowNum;
  // };

  getNowNum = () => this.state.nowNum;

  touchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0] || e.changedTouches[0];
    const moveX = parseInt(touch.pageX, 10) - this.dragStartX;
    const scale = moveX / (this.dragEndX - this.dragStartX);
    const num = (((this.props.maxNum - this.props.minNum) * scale) + 1).toFixed(0);
    this.changeNum(parseInt(num, 10), null);
  };

  touchEnd = (e) => {
    e.preventDefault();
    this.tipsTimer();
  };

  toggleTips = (type) => {
    if (this.props.tipsShowTime && this.props.tipsShowTime !== 0) {
      this.dragTips.style.visibility = type && type === 'show' ? 'visible' : 'hidden';
    }
  };

  tipsTimer() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = setTimeout(() => this.toggleTips('hide'), this.props.tipsShowTime);
  }

  clickDragBtn = (direct) => (e) => {
    e.preventDefault();
    const { step } = this.props;
    const nowNum = parseInt(this.state.nowNum, 10) + (changeDirect[direct] * step);
    this.changeNum(nowNum, () => {
      this.tipsTimer();
    });
  };

  clickDragLine = (e) => {
    e.preventDefault();
    const touch = e.touches[0] || e.changedTouches[0];
    const clickPointX = parseInt(touch.pageX, 10);
    const scale = (clickPointX - this.dragStartX) / (this.dragEndX - this.dragStartX);
    const num = (((this.props.maxNum - this.props.minNum) * scale) + 1).toFixed(0);
    this.changeNum(parseInt(num, 10), null);
  };

  changeNum = (num, callBack) => {
    this.toggleTips('show');
    const { minNum, maxNum } = this.props;
    let nowNum = num;
    if (num <= minNum) nowNum = minNum;
    if (num >= maxNum) nowNum = maxNum;

    this.setState({ nowNum }, () => {
      if (callBack) callBack();
    });
  };

  render() {
    const { hasBtn, minNum, maxNum, clsName } = this.props;
    const { nowNum } = this.state;
    const amountPercent = (((nowNum - minNum) / (maxNum - minNum)) * 100).toFixed(0);
    return (
      <div styleName="drag" className={clsName}>
        {hasBtn ? <button onTouchTap={this.clickDragBtn('less')}>－</button> : null}
        <div styleName="drag-box" ref={(ref) => { this.dragBox = ref; }}>
          <b
            styleName="drag-line drag-left"
            id="dragLeft"
            style={{ right: `${100 - amountPercent}%` }}
          />
          <b
            styleName="drag-line drag-right"
            id="dragRight"
            style={{ left: `${amountPercent}%` }}
          />
          <span
            styleName="drag-block"
            id="dragBlock"
            ref={(ref) => { this.dragBlock = ref; }}
            style={{ left: `${amountPercent}%` }}
          >{nowNum}</span>
          <b
            styleName="drag-tips"
            id="dragTips"
            ref={(ref) => { this.dragTips = ref; }}
            style={{ left: `${amountPercent}%` }}
          >{nowNum}</b>
        </div>
        {hasBtn ? <button onTouchTap={this.clickDragBtn('more')}>＋</button> : null}
      </div>
    );
  }
}

export default cssModules(Drag, styles, { allowMultiple: true, errorWhenNotFound: false });
