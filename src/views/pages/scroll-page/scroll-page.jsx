/**
 * Created by dell on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './scroll-page.scss';

const pageFullNum = 4;
const screenW = document.documentElement.clientHeight;

class ScrollPage extends Component {
  static propTypes = {
    goCallBack: PropTypes.func,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 0,
    };
    this.scrollEventArr = [
      ['touchstart', this.touchStartScrollPage],
      ['touchmove', this.touchMoveScrollPage],
      ['touchend', this.touchEndScrollPage],
    ];
    this.btnEventArr = [
      ['touchstart', this.onClickBtnStart],
      ['touchend', this.onClickBtnEnd],
    ];
  }

  componentDidMount() {
    document.querySelectorAll('.page-btn').forEach((btn) => {
      this.eventListener(btn, 'addEventListener', this.btnEventArr, true);
    });

    this.eventListener(this.scrollPage, 'addEventListener', this.scrollEventArr);
  }

  componentWillUnmount() {
    document.querySelectorAll('.page-btn').forEach((btn) => {
      this.eventListener(btn, 'removeEventListener', this.btnEventArr, true);
    });

    this.eventListener(this.scrollPage, 'removeEventListener', this.scrollEventArr);
  }

  onClickBtnStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const pageNum = this.state.pageNum + 1;
    if (pageNum >= pageFullNum) {
      this.goHome(e);
    } else {
      this.setState({ pageNum: this.state.pageNum + 1 });
    }
  };

  onClickBtnEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  eventListener = (el, listenerFunc, opt = [[]], cap = false) => (
    opt.forEach((item) => {
      el[listenerFunc](item[0], item[1], cap);
    })
  );

  touchStartScrollPage = (e) => {
    e.preventDefault();
    this.pageWrap.style.webkitTransition = '';
    this.pageWrap.style.transition = '';
    const touch = e.touches[0] || e.changedTouches[0];
    this.startX = parseInt(touch.pageX, 10);
    this.nowPageNum = this.state.pageNum;
    this.startTime = new Date().getTime();
  };

  touchMoveScrollPage = (e) => {
    e.preventDefault();
    const touch = e.touches[0] || e.changedTouches[0];
    const moveX = parseInt(touch.pageX, 10) - this.startX;
    this.moveScale = moveX / screenW;
    this.setState({ pageNum: this.nowPageNum - this.moveScale });
  };

  touchEndScrollPage = (e) => {
    e.preventDefault();
    this.pageWrap.style.webkitTransition = 'WebkitTransform 300ms';
    this.pageWrap.style.transition = 'transform 300ms';
    const endTime = new Date().getTime();
    let pageNum = this.nowPageNum;
    if (this.state.pageNum <= 0) {
      pageNum = 0;
    } else if (this.state.pageNum >= (pageFullNum - 1)) {
      pageNum = pageFullNum - 1;
    } else if ((endTime - this.startTime) <= 300 || 3 * Math.abs(this.moveScale) >= 2) {
      if (this.moveScale >= 0) {
        pageNum -= 1;
      } else {
        pageNum += 1;
      }
    }

    this.setState({ pageNum });
  };

  goHome = (e) => {
    e.preventDefault();
    if (this.props.goCallBack) this.props.goCallBack();
  };

  render() {
    return (
      <div styleName="scroll-page" ref={(ref) => { this.scrollPage = ref; }}>
        <div
          styleName="page-wrap"
          ref={(ref) => { this.pageWrap = ref; }}
          style={{
            WebkitTransform: `WebkitTranslateX(${-this.state.pageNum * 100}%)`,
            transform: `translateX(${-this.state.pageNum * 100}%)`,
            WebkitTransition: 'WebkitTransform 300ms',
            transition: 'transform 300ms',
          }}
        >
          {
            Array.from({ length: pageFullNum }, (n, idx) => (
              <div key={idx} styleName={`page-bg page-bg-${idx}`}>
                <b
                  className="page-btn"
                  styleName={`page-btn page-btn-${idx}`}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default cssModules(ScrollPage, styles, { allowMultiple: true, errorWhenNotFound: false });
