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

  componentDidMount() {
    this.wrap.addEventListener('touchend', this.close);
  }

  componentWillUnmount() {
    this.wrap.removeEventListener('touchend', this.close);
  }

  close = (e) => {
    e.preventDefault();
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    removeComponentByRef(this.wrap);
  };

  render() {
    return (
      <div styleName="mask" ref={(ref) => { this.wrap = ref; }} />
    );
  }
}

export default class Mask extends MaskWrap {
  static show(callback) {
    insertComponent(<MaskWrap onCloseCallback={callback} />);
  }
}

