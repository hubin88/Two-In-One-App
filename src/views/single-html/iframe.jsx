/**
 * Created by Amg on 2016/12/26.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import styles from './iframe.scss';
import Header from '../../components/header/header';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class SingleHtml extends Component {
  static defaultProps = {
    needHeader: true,
  };
  static propTypes = {
    title: PropTypes.string,
    needHeader: PropTypes.bool,
    leftBtnFunc: PropTypes.func,
    rightBtnFunc: PropTypes.func,
    htmlUrl: PropTypes.string,
  };

  leftFunc = this.props.needHeader && this.props.leftBtnFunc ? this.props.leftBtnFunc : null;
  rightFunc = this.props.needHeader && this.props.rightBtnFunc ? this.props.rightBtnFunc : null;

  render() {
    const { title, htmlUrl } = this.props;
    return (
      <div styleName="single-html">
        <header>
          <Header
            title={title}
            leftBtnCallBack={this.leftFunc}
            rightBtnCallBack={this.rightFunc}
          />
        </header>
        <section>
          <iframe src={htmlUrl} />
        </section>
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

