/**
 * Created by dell on 2016/12/23.
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ScrollPage from './scroll-page/scroll-page';
import AdPage from './ad_page/ad-page';
import { Cookie } from '../../ultils/tools';

export default class StartPageWrap extends Component {
  constructor(props) {
    super(props);
    const hasShowScrollPage = JSON.parse(localStorage.getItem('hasShowScrollPage')) || false;
    this.state = { hasShowScrollPage };
  }

  componentWillUnmount() {
    // localStorage.removeItem('hasShowScrollPage');
  }

  scrollPageGoCallBack = () => {
    this.setState({
      hasShowScrollPage: true,
    });
    localStorage.setItem('hasShowScrollPage', true);
  };

  adPageGoCallBack = () => {
    Cookie.setCookie('isStart', true);
    browserHistory.push('/home');
  };

  render() {
    return (
      this.state.hasShowScrollPage ?
        <AdPage goCallBack={this.adPageGoCallBack} /> :
        <ScrollPage goCallBack={this.scrollPageGoCallBack} />
    );
  }
}
