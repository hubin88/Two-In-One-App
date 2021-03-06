/**
 * Created by dz on 16/9/26.
 */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './dialog.scss';
import { insertComponent, removeComponentByRef } from '../../ultils/helper';

@cssModules(styles, { errorWhenNotFound: false })
class DialogWrap extends React.Component {
  static propTypes = {
    title: PropTypes.any.isRequired,
    children: PropTypes.any,
    style: PropTypes.object,
    onCloseCallback: PropTypes.func,
  };

  state = {
    isClose: true,
  };

  componentDidMount() {
    this.dialog.addEventListener('webkitAnimationEnd', this.addOverlayTouch);
  }

  componentWillUnmount() {
    this.overlay.removeEventListener('touchstart', this.close);
  }

  addOverlayTouch = () => {
    this.dialog.removeEventListener('webkitAnimationEnd', this.addOverlayTouch);
    this.overlay.addEventListener('touchend', this.close);
  };

  close = (e) => {
    e.preventDefault();

    if (this.props.onCloseCallback) this.props.onCloseCallback();
    this.setState({
      isClose: false,
    });
    this.dialog.addEventListener('webkitAnimationEnd', () => removeComponentByRef(this.box));
  };

  render() {
    return (
      <div ref={(ref) => { this.box = ref; }}>
        <div styleName="overlay" ref={(ref) => { this.overlay = ref; }} />
        <div
          styleName={this.state.isClose ? 'dialog' : 'close-dialog'}
          ref={(ref) => { this.dialog = ref; }}
          style={this.props.style}
        >
          <div styleName="title" className="main-nav-bg-color">
            {this.props.title}
            <input type="button" styleName="close" onTouchTap={(e) => this.close(e)} />
          </div>
          <div styleName="content">
            <div styleName="cell">{this.props.children}</div>
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
