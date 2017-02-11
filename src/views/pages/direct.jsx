/**
 * Created by dell on 2016/12/23.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './direct.scss';
// import TouchPage from './touch_page/touch_page';
import OnePage from './one_page/one_page';

class Direct extends Component {
  static propTypes = {
    go: PropTypes.func,
    dispatch: PropTypes.any,
  };

  componentDidMount() {
    this.localStorage();
  }

  localStorage() {
    const { dispatch } = this.props;
    // if (localStorage.getItem('direct')) {
    return <OnePage go={this.go} dispatch={dispatch} />;
    // }
    // localStorage.setItem('direct', true);
    // return <TouchPage go={this.go} />;
  }

  go() {
    location.href = location.href;
  }

  render() {
    return (
      this.localStorage()
    );
  }
}

export default cssModules(Direct, styles, { allowMultiple: true, errorWhenNotFound: false });
