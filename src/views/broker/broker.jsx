import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { browserHistory } from 'react-router';
import styles from './broker.scss';
import Iframe from '../single-html/iframe';
import AppConfig from '../../server/app-config';
import formatUrl from '../../ultils/url-format';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Broker extends Component {
  static propTypes = {
    value: PropTypes.string,
    systemInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { systemInfo: { systemType, isLogin } } = nextProps;
    if (systemType !== this.props.systemInfo.systemType && !isLogin) {
      browserHistory.push('/login?source=broker');
    }
  }


  render() {
    const { sessionId, mobile, orgId } = AppConfig.userData();
    const url = 'http://192.168.0.71:9000';
    const opt = {
      sessionId,
      mobile,
      orgId,
      orgCode: '0004',
      exchangeID: 10,
      type: AppConfig.systemType(),
    };
    const directUrl = formatUrl(url, opt);

    return (
      <div styleName="broker">
        <Iframe
          didMountCallBack={this.connentIframe}
          needHeader={false}
          htmlUrl={directUrl}
          leftBtnFunc={this.back}
        />
      </div>
    );
  }
}

function

mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export
default

connect(mapStateToProps)(
  Broker
)
;

