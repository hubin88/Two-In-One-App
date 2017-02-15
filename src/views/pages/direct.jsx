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
    return <OnePage go={this.go} dispatch={dispatch} />;
    // todo 首页引导为完善
    // if (localStorage.getItem('direct')) {
    //   return <OnePage go={this.go} dispatch={dispatch} />;
    // }
    // return <TouchPage go={this.go} dispatch={dispatch} />;
  }

  go() {
    // localStorage.setItem('direct', true);
    // location.href = location.href;
  }

  render() {
    return (
      this.localStorage()
    );
  }
}

export default cssModules(Direct, styles, { allowMultiple: true, errorWhenNotFound: false });
