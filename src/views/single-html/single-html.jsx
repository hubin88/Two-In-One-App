/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './single-html.scss';

class SingleHtml extends Component {
  static propTypes = {
    htmlURL: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div styleName="single-html">
        {this.props.htmlURL}
      </div>
    );
  }
}

export default cssModules(SingleHtml, styles, { allowMultiple: true, errorWhenNotFound: false });
