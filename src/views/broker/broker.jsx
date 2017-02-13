import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { browserHistory } from 'react-router';
import styles from './broker.scss';
import Iframe from '../single-html/iframe';
import AppConfig from '../../server/app-config';

// const ttt = {
//   DCB: 'http://www.baidu.com',
//   DWB: 'http://www.hao123.com',
// };

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
    const orgCode = '0004';
    const exChangeID = 10;
    const directUrl = `http://192.168.1.127/?sessionId=${sessionId}&mobile=${mobile}&
    orgCode=${orgCode}&exChangeID=${exChangeID}&orgID=${orgId}&type=${AppConfig.systemType()}`;
    // const directUrl = ttt[AppConfig.systemType()];
    return (
      <div styleName="broker">
        <Iframe needHeader={false} htmlUrl={directUrl} leftBtnFunc={this.back} />
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

export default connect(mapStateToProps)(Broker);

