/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './close-out.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class CloseOut extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  onClick = () => {}

  render() {
    return (
      <div styleName="close-out" />
    );
  }
}

export default cssModules(CloseOut);
