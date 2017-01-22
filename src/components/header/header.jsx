/**
 * Created by dell on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './header.scss';

class Header extends Component {
  static propTypes = {
    title: PropTypes.any,
    hasTop: PropTypes.bool,
    hasLeftBtnIcon: PropTypes.bool,
    leftBtnTxt: PropTypes.any,
    rightBtnTxt: PropTypes.any,
    titleCallBack: PropTypes.func,
    leftBtnCallBack: PropTypes.func,
    rightBtnCallBack: PropTypes.func,
  };
  static defaultProps = {
    title: '',
    hasTop: true,
    hasLeftBtnIcon: true,
    leftBtnTxt: '',
    rightBtnTxt: '保存',
  };
  state = { titleIdx: 0 };

  clickTitleBtn = (idx) => {
    this.setState({ titleIdx: idx });
  };

  leftBtnClick = () => {
    if (this.props.leftBtnCallBack) this.props.leftBtnCallBack();
    // window.history.back();
  };

  rightBtnClick = () => {
    if (this.props.rightBtnCallBack) this.props.rightBtnCallBack();
  };

  renderTitle = () => {
    const { title } = this.props;
    if (typeof title === 'string') {
      return (<span>{title}</span>);
    } else if (typeof title === 'object') {
      // title为数组情况下 为object情况未完成
      if (Object.prototype.toString.call(title) === '[object Array]') {
        if (title.length === 1) {
          const label = title[0].label || title[0];
          return <span>{label}</span>;
        }
        return (
          <div styleName="title-btn-box">
            {
              title.map((t, idx) => {
                const label = t.label || t;
                const type = t.type || t;
                const clickFunc = () => {
                  if (t && t.clickFunc) t.clickFunc(type);
                  if (this.props.titleCallBack) this.props.titleCallBack(type);
                  this.clickTitleBtn(idx);
                };
                return (<button
                  key={idx}
                  styleName={`title-btn ${this.state.titleIdx === idx ? 'active' : ''}`}
                  onClick={clickFunc}
                >
                  {label}
                </button>);
              })
            }
          </div>
        );
      }
    }
    return title;
  };

  render() {
    const {
      hasTop, leftBtnCallBack, leftBtnTxt, hasLeftBtnIcon, rightBtnCallBack, rightBtnTxt,
    } = this.props;
    return (
      <div styleName="header">
        {
          hasTop ? <div styleName="top" /> : null
        }
        <div styleName="title-box">
          {
            leftBtnCallBack ?
              <button
                styleName={`left-btn ${hasLeftBtnIcon ? 'left-btn-icon' : ''}`}
                onClick={this.leftBtnClick}
              >
                {leftBtnTxt}
              </button> : null
          }
          <div styleName="title">{this.renderTitle()}</div>
          {
            rightBtnCallBack ?
              <button styleName="right-btn" onClick={this.rightBtnClick}>
                {rightBtnTxt}
              </button> : null
          }
        </div>
      </div>
    );
  }
}

export default cssModules(Header, styles, { allowMultiple: true, errorWhenNotFound: false });

