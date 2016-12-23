/**
 * Created by admin on 2016/12/22.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './track.scss';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div styleName="track">轨迹</div>
    );
  }
}

export default cssModules(Track, styles, { allowMultiple: true, errorWhenNotFound: false });
