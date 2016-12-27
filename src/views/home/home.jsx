import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './home.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Home extends Component {
  static defaultProps = {
  };
  render() {
    return (
      <div styleName="home">
        home(首页)
      </div>
    );
  }
}

