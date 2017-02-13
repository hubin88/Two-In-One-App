/**
 * Created by dz on 16/9/26.
 */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './dialog.scss';
import { insertComponent, removeComponentByRef } from '../../../server/tools';

@cssModules(styles, { errorWhenNotFound: false })
class DialogWrap extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    style: PropTypes.object,
    onCloseCallback: PropTypes.func,
  };

  componentDidMount() {
    this.layout();
  }

  close = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    removeComponentByRef(this.wrap);
  };

  layout = () => {
    const e = document.documentElement;
    const rect = { width: e.clientWidth, height: e.clientHeight + document.body.scrollTop };
    const r = this.box.getBoundingClientRect();
    const height = rect.height * 0.65;
    const left = (rect.width - r.width) / 2;
    const style = `left:${left}px;height:${height}px`;
    this.box.setAttribute('style', style);
  };

  render() {
    return (
      <div id="wrap" ref={(ref) => { this.wrap = ref; }}>
        <div styleName="overlay" style={this.props.style} />
        <div styleName="dialog" ref={(ref) => { this.box = ref; }}>
          <div styleName="title" className="main-nav-bg-color">
            {this.props.title}
          </div>
          <div styleName="content">
            <div styleName="cell">
              {this.props.children}
            </div>
          </div>
          <div styleName="close">
            <input type="button" styleName="close-btn" onTouchTap={this.close} />
          </div>
        </div>
      </div>
    );
  }
}

export default class Dialog extends DialogWrap {
  static show(title, content, style = undefined) {
    insertComponent(<DialogWrap title={title} style={style}>{content}</DialogWrap>);
  }
}
