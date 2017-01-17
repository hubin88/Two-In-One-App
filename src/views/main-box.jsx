/**
 * Created by Amg on 2017/1/17.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import Footer from './footer';
import Header from './header';
import LeftNav from './left-nav';
import Mask from './mask';
import styles from './main-box.scss';
import { styleConfig } from '../server/app-config';
import { toChangeExchange } from '../model/action';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class MainBox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,
    children: PropTypes.any,
  };

  state = {
    isShowLeftNav: false,
  };

  selectExchange(exchangeData) {
    this.props.dispatch(toChangeExchange(exchangeData));
  }

  showLeftNav = () => {
    this.setState({
      isShowLeftNav: true,
    }, () => { Mask.show(this.hideLeftNav); });
  };

  hideLeftNav = () => {
    this.selectExchange(this.leftNav.getExchangeData());
    this.setState({
      isShowLeftNav: false,
    });
  };

  render() {
    const {
      dispatch,
      exchangeInfo: { exchangeList, systemList, isSingleSystem },
      systemInfo: { systemType, navList },
    } = this.props;
    return (
      <div
        className={`main-box ${this.state.isShowLeftNav ? 'show-left-nav' : 'hide-left-nav'}`}
        style={{ paddingTop: styleConfig.headerH, paddingBottom: styleConfig.footerH }}
      >
        <LeftNav
          ref={(ref) => { this.leftNav = ref; }}
          dispatch={dispatch}
          exchangeList={exchangeList}
        />
        <header style={{ height: styleConfig.headerH }}>
          <Header
            dispatch={dispatch}
            isSingleSystem={isSingleSystem}
            systemList={systemList}
            systemType={systemType}
            showLeftNav={this.showLeftNav}
          />
        </header>
        <section id="section">
          {this.props.children}
        </section>
        <footer style={{ height: styleConfig.footerH }}>
          <Footer navList={navList} />
        </footer>
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

export default connect(mapStateToProps)(MainBox);

