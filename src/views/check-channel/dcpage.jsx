/**
 * Created by dell on 2017/1/5.
 */
import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './gold.scss';
import SingleHtml from '../single-html/single-html';
import { SYS_DCB, SYS_DWB } from '../../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Dcpage extends Component {
  static defaultProps = {
    htmlURL: 'http://120.25.135.199:9003/webstatic/1zjyjy/rule/rule.html',
    title: '点差宝介绍',
  };
  static propTypes = {
    htmlURL: PropTypes.string,
    title: PropTypes.string,
    systemInfo: PropTypes.object.isRequired,
  };

  setPage = () => {
    let pageHtml = '';
    if (this.props.systemInfo.systemType === SYS_DCB) {
      pageHtml = (
        <SingleHtml htmlURL={this.props.htmlURL} title={this.props.title} />
      );
    }
    if (this.props.systemInfo.systemType === SYS_DWB) {
      pageHtml = (
        <SingleHtml htmlURL={this.props.htmlURL} title={this.props.title} />
      );
    }
    return pageHtml;
  };

  render() {
    return (
      <div>
        {this.setPage()}
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

export default connect(mapStateToProps)(Dcpage);
