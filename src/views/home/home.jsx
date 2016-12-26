import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './home.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Home extends Component {
  render() {
    return (
      <div styleName="home">
        home(首页)
      </div>
    );
  }
}

