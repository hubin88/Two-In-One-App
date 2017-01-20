/**
 * Created by admin on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Reset from '../sign/reset';

class ResetWrap extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    exchangeInfo: PropTypes.object,
  };
  resetSuc = () => {
    browserHistory.push('/');
  };

  render() {
    return (
      <Reset
        resetSuccess={this.resetSuc}
        orgId={this.props.exchangeInfo.orgId}
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(ResetWrap);