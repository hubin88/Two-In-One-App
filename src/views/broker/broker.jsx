import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './broker.scss';

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
    return (
      <div styleName="broker">
        经纪人
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

