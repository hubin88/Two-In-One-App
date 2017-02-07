/**
 * Created by dell on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './one_page.scss';

require('../../../images/splash/ad_Content@3x.png');
require('../../../images/splash/ad_bottom@3x.png');

class OnePage extends Component {
  static propTypes = {
    go: PropTypes.func,
  };

  componentDidMount() {
    this.timeHref();
  }

  timeHref() {
    this.onePage.style.height = `${window.innerHeight}px`;
    if (window.devicePixelRatio === 3) {
      const ad = this.ad.children;
      for (let i = 0; i < ad.length - 1; i++) {
        this.src(ad[i], 0);
      }
    }
    let speed = 5;
    const times = setInterval(() => {
      speed--;
      this.over.firstElementChild.innerText = speed;
      const text = parseInt(this.over.firstElementChild.innerText, 10);
      if (text === 0) {
        clearInterval(times);
        location.href = location.href;
      }
    }, 1000);
  }

  src(item, index) {
    const src = item.children[index];
    const n = src.getAttribute('src').split('@')[0].length;
    const m = src.getAttribute('src').split('@')[1].substring(1);
    const newSrc = `${src.getAttribute('src').substring(0, n)}@3${m}`;
    src.setAttribute('src', newSrc);
  }

  render() {
    return (
      <div styleName="one_page" ref={(ref) => { this.onePage = ref; }}>
        <div styleName="go-ad" ref={(ref) => { this.ad = ref; }}>
          <div styleName="splash ad_content">
            <img src={require('../../../images/splash/ad_Content@2x.png')} alt="" />
          </div>
          <div styleName="splash ad_bottom">
            <img src={require('../../../images/splash/ad_bottom@2x.png')} alt="" />
          </div>
          <div styleName="over" ref={(ref) => { this.over = ref; }} onClick={this.props.go}>
            跳过<span>5</span>s
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(OnePage, styles, { allowMultiple: true, errorWhenNotFound: false });