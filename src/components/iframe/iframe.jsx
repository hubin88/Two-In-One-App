/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './iframe.scss';
import Header from '../header/header';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class SingleHtml extends Component {
  static defaultProps = {
    needHeader: true,
  };
  static propTypes = {
    title: PropTypes.string,
    needHeader: PropTypes.bool,
    leftBtnFunc: PropTypes.func,
    rightBtnFunc: PropTypes.func,
    htmlUrl: PropTypes.string,
    didMountCallBack: PropTypes.func,
  };

  // componentDidMount() {
  //   this.connectTest();
  // }
  //
  // receiveMessage = (event) => {
  //   console.log('a接收 event', event.data);
  // };
  //
  // connectTest = () => {
  //   const ifr = document.getElementById('ifr');
  //   const targetOrigin = 'http://192.168.0.71:9000';  // 若写成'http://b.com/c/proxy.html'效果一样
  //   ifr.contentWindow.postMessage('I was there!', targetOrigin);
  //
  //   window.addEventListener('message', this.receiveMessage, false);
  // };

  leftFunc = this.props.needHeader && this.props.leftBtnFunc ? this.props.leftBtnFunc : null;
  rightFunc = this.props.needHeader && this.props.rightBtnFunc ? this.props.rightBtnFunc : null;

  render() {
    const { title, htmlUrl } = this.props;
    return (
      this.props.needHeader ?
        <div styleName="iframe-wrap">
          <header>
            <Header
              title={title}
              leftBtnCallBack={this.leftFunc}
              rightBtnCallBack={this.rightFunc}
            />
          </header>
          <div styleName="iframe">
            <iframe id="ifr" src={htmlUrl} />
          </div>
        </div> :
        <div styleName="iframe">
          <iframe id="ifr" src={htmlUrl} />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(SingleHtml);

