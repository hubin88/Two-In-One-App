/**
 * Created by Amg on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AppConfig from '../../../server/app-config';
import Iframe from '../../../components/iframe/iframe';
import { requestGetDirect } from '../../../model/action';
import { DIRECTS } from '../../../server/define';

class GoldHtml extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    systemInfo: PropTypes.object,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { dispatch, location: { pathname } } = this.props;
    this.pathName = pathname.substring(1);
    this.htmlInfo = AppConfig.singleHtml()[this.pathName] || {};
    const op = DIRECTS[this.pathName] || '';
    const obj = {
      op,
      terminalType: 'app',
    };
    dispatch(requestGetDirect(obj));
  }

  back = () => {
    browserHistory.push('/home');
  };

  render() {
    const { systemInfo: { directUrl } } = this.props;
    return (
      <Iframe title={this.htmlInfo.title} htmlUrl={directUrl} leftBtnFunc={this.back} />
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(GoldHtml);
