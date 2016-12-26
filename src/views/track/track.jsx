import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './track.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Record extends Component {

  render() {
    return (
      <div styleName="track">
        Track(轨迹)!
      </div>
    );
  }
}

