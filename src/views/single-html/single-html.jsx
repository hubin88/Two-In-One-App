/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './single-html.scss';
import AppConfig from '../../server/app-config';
import { requestGetDirect } from '../../model/action';


@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class SingleHtml extends Component {
  static propTypes = {
    htmlURL: PropTypes.string,
    title: PropTypes.string,
    onCloseCallback: PropTypes.func,
    location: PropTypes.object,
    systemInfo: PropTypes.object,
    dispatch: PropTypes.any,
  };
  componentWillMount() {
    const { dispatch, systemInfo } = this.props;
    const pathName = this.props.location.pathname;
    const singleHtml = AppConfig.singleHtml();
    const checkChannel = this.props.systemInfo.checkChannel;
    this.htmlInfo = {};
    let ops = '';
    if (singleHtml[pathName.substring(1, singleHtml.length)]) {
      this.htmlInfo = singleHtml[pathName.substring(1, singleHtml.length)];
      ops = 'ZF';
    } else {
      this.htmlInfo = checkChannel.direction.substring(1, checkChannel.direction.length);
      ops = 'TX';
    }
    const obj = {
      sessionId: systemInfo.sessionId,
      op: ops,
      terminalType: 'app',
    };
    dispatch(requestGetDirect(obj));
  }

  toUpper = () => {
    if (this.props.onCloseCallback) this.props.onCloseCallback();
    window.history.back();
  };
  render() {
    // const pathName = this.props.location.pathname;
    // const singleHtml = AppConfig.singleHtml();
    // console.log('singleHtml', singleHtml);
    // const checkChannel = this.props.systemInfo.checkChannel;
    // let htmlInfo = {};
    // if (singleHtml[pathName.substring(1, singleHtml.length)]) {
    //   htmlInfo = singleHtml[pathName.substring(1, singleHtml.length)];
    // } else {
    //   htmlInfo = checkChannel.direction.substring(1, checkChannel.direction.length);
    //   console.log(htmlInfo);
    // }
    const title = this.htmlInfo.title || '';
    const { systemInfo: { directUrl } } = this.props;
    return (
      <div styleName="single-html">
        <div styleName="titleName">
          <input type="button" styleName="close" onClick={this.toUpper} />
          <span>{title}</span>
        </div>
        <iframe src={directUrl} />
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

