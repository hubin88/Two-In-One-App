import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './rule.scss';

const config = require('../../../app.config');

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Rule extends Component {
  static propTypes = {
    DC: PropTypes.object,
    DW: PropTypes.object,
    systemInfo: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      DC: config.htmlPage.DC,
      DW: config.htmlPage.DW,
    };
  }

  componentWillMount() {
    console.log(11);
  }

  getRule = () => {
    let htmls = '';
    if (this.props.systemInfo.systemType === 'DCB') {
      htmls = (
        <iframe src={this.state.DC} />
      );
    }
    if (this.props.systemInfo.systemType === 'DWB') {
      htmls = (
        <iframe src={this.state.DW} />
      );
    }
    return htmls;
  };
  render() {
    return (
      <div styleName="rules">
        {this.getRule()}
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

export default connect(mapStateToProps)(Rule);
