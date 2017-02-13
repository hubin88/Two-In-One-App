import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './broker.scss';
import Iframe from '../single-html/iframe';
import AppConfig from '../../server/app-config';

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

  render() {
    const { sessionId, mobile, orgId } = AppConfig.userData();
    const orgCode = '0004';
    const exChangeID = 10;
    const directUrl = `http://192.168.1.127/home.html?sessionId=${sessionId}&mobile=${mobile}&
    orgCode=${orgCode}&exChangeID=${exChangeID}&orgID=${orgId}&type=${AppConfig.systemType()}`;
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

