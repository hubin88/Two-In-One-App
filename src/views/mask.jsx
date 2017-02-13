/**
 * Created by admin on 2017/1/11.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './mask.scss';
import { insertComponent, removeComponentByRef } from '../server/tools';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class MaskWrap extends Component {
  static propTypes = {
    onCloseCallback: PropTypes.func,
  };
  close = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    removeComponentByRef(this.wrap);
  };

  render() {
    return (
      <div styleName="mask" ref={(ref) => { this.wrap = ref; }} onTouchTap={this.close} />
    );
  }
}

export default class Mask extends MaskWrap {
  static show(callback) {
    insertComponent(<MaskWrap onCloseCallback={callback} />);
  }
}

