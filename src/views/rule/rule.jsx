import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './rule.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Rule extends Component {
  static propTypes = {
    systemInfo: PropTypes.object.isRequired,
  };

  getRule = () => {
    const { systemInfo:{ systemType } } = this.props;
    return <iframe src={HTML_PAGE[systemType]} />;
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
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Rule);
