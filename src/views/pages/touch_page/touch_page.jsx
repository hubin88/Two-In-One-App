/**
 * Created by dell on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './touch_page.scss';
import { showFirstAD } from '../../../model/action';

for (let i = 1; i <= 4; i++) {
  require(`../../../images/help/help_na${i}@3x.png`);
  require(`../../../images/help/ad_arrow${i}@3x.png`);
}
class TouchPage extends Component {
  static propTypes = {
    go: PropTypes.func,
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    this.touchPage();
  }

  componentWillUnmount() {
    // console.log(document.getElementById('direct'));
    // document.getElementById('direct').removeEventListener('touchstart', (e) => this.touchStart(e));
    // document.getElementById('direct').removeEventListener('touchmove', (e) => this.touchMove(e));
    // document.getElementById('direct').removeEventListener('touchend', (e) => this.touchEnd(e));
  }

  touchPage() {
    const intro = {
      root: this.direct,
      page: 0,   // 当前页数
      directImg: this.directImg,
      length: this.direct.firstElementChild.children.length,
      width: window.innerWidth,
      setwidth() {
        const me = this;
        const img = me.root.firstElementChild.children;
        for (let i = 0; i < img.length; i++) {
          img[i].style.width = `${me.width}px`;
        }
        me.directImg.style.width = `${img.length * me.width}px`;
        if (window.devicePixelRatio === 3) {
          const dImgs = me.directImg.children;
          for (let i = 0; i < dImgs.length; i++) {
            me.src(dImgs[i], 0);
            me.src(dImgs[i], 1);
          }
        }
      },
      src(item, index) {
        const src = item.children[index].children[0];
        const n = src.getAttribute('src').split('@')[0].length;
        const m = src.getAttribute('src').split('@')[1].substring(1);
        const newSrc = `${src.getAttribute('src').substring(0, n)}@3${m}`;
        src.setAttribute('src', newSrc);
      },
      left() {
        const me = this;
        // (me.page && me.page < 0) && (me.page = 0)
        me.page += 1;
        if (me.page && me.page > me.length - 1) {
          me.page = me.length - 1;
          return;
        }
        me.goto();
      },
      right() {
        const me = this;
        if (me.page && me.page < 0) {
          me.page = 0;
          return;
        }
        me.page -= 1;
        me.goto();
      },
      goto(id) {
        // 跳转
        const me = this;
        me.page = id || (id === 0 ? 0 : me.page);

        me.directImg.style.webkitTransform = `translateX(${-me.page * me.width}px)`;
        me.directImg.style.webkitTransitionDuration = '0.5s';
        me.directImg.style.webkitTransformStyle = 'preserve-3d';
        me.directImg.style.webkitBackfaceVisibility = 'hidden';
        me.directImg.style.webkitPerspective = '500';

        me.directImg.style.transform = `translateX(${-me.page * me.width}px)`;
        me.directImg.style.transitionDuration = '0.5s';
        me.directImg.style.transformStyle = 'preserve-3d';
        me.directImg.style.backfaceVisibility = 'hidden';
        me.directImg.style.perspective = '500';
      },
      evnets() {
        const me = this;
        let sx = 0;

        function touchStart(e) {
          const target = e.target;
          if (target.id !== 'go' && target.offsetParent.id !== 'go') {
            e.preventDefault();
          }
          const touch = e.touches[0] || e.changedTouches[0];
          sx = touch.pageX;
        }

        function touchMove(e) {
          e.preventDefault();
          const touch = e.touches[0] || e.changedTouches[0];
          const mx = touch.pageX;
          const cx = mx - sx;
          if (me.page === 0 && cx > 0) {
            me.directImg.style.webkitTransform = 'translateX(0px)';
            me.directImg.style.webkitTransitionDuration = '0s';
            me.directImg.style.transform = 'translateX(0px)';
            me.directImg.style.transitionDuration = '0s';
            return;
          }
          if (me.page === me.length - 1 && cx < 0) {
            me.directImg.style.webkitTransform = `translateX(${-me.page * me.width}px)`;
            me.directImg.style.webkitTransitionDuration = '0s';
            me.directImg.style.transform = `translateX(${-me.page * me.width}px)`;
            me.directImg.style.transitionDuration = '0s';
            return;
          }
          const x = (-me.page * me.width) + cx;
          me.directImg.style.webkitTransform = `translateX(${x}px)`;
          me.directImg.style.webkitTransitionDuration = '0s';
          me.directImg.style.transform = `translateX(${x}px)`;
          me.directImg.style.transitionDuration = '0s';
        }

        function touchEnd(e) {
          const target = e.target;
          if (target.id !== 'go' && target.offsetParent.id !== 'go') {
            e.preventDefault();
          }
          const touch = e.touches[0] || e.changedTouches[0];
          const endx = touch.pageX;
          const cx = endx - sx;
          if (me.page === 0 && cx > 0) {
            return;
          }
          if (me.page === me.length - 1 && cx < 0) {
            return;
          }
          // Math.abs(cx) > 100 ? (cx < 0 ? me.left() : me.right()) : me.goto();
          if (Math.abs(cx) > 100) {
            if (cx < 0) {
              me.left();
            } else {
              me.right();
            }
          } else {
            me.goto();
          }
        }

        me.root.addEventListener('touchstart', touchStart);
        me.root.addEventListener('touchmove', touchMove);
        me.root.addEventListener('touchend', touchEnd);
      },
      init() {
        const me = this;
        me.page = 0;
        me.evnets();
        me.setwidth();
      },
    };
    intro.init();
  }

  goHome = () => {
    localStorage.setItem('direct', true);
    this.props.dispatch(showFirstAD());
  }

  render() {
    return (
      <div styleName="direct" ref={(ref) => { this.direct = ref; }}>
        <div ref={(ref) => { this.directImg = ref; }} data-direct-img="">
          <div data-img>
            <div styleName="help help_na1">
              <img src={require('../../../images/help/help_na1@2x.png')} alt="" />
            </div>
            <div styleName="ad ad_arrow1">
              <img src={require('../../../images/help/ad_arrow1@2x.png')} alt="" />
            </div>
          </div>
          <div data-img>
            <div styleName="help help_na2">
              <img src={require('../../../images/help/help_na2@2x.png')} alt="" />
            </div>
            <div styleName="ad ad_arrow2">
              <img src={require('../../../images/help/ad_arrow2@2x.png')} alt="" />
            </div>
          </div>
          <div data-img>
            <div styleName="help help_na3">
              <img src={require('../../../images/help/help_na3@2x.png')} alt="" /></div>
            <div styleName="ad ad_arrow3">
              <img src={require('../../../images/help/ad_arrow3@2x.png')} alt="" />
            </div>
          </div>
          <div data-img>
            <div styleName="help help_na4">
              <img src={require('../../../images/help/help_na4@2x.png')} alt="" />
            </div>
            <div id="go" onTouchTap={this.goHome} styleName="ad ad_arrow4">
              <img src={require('../../../images/help/ad_arrow4@2x.png')} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default cssModules(TouchPage, styles, { allowMultiple: true, errorWhenNotFound: false });
