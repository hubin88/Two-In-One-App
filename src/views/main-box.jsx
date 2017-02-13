/**
 * Created by Amg on 2017/1/17.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import Footer from './footer';
import Header from '../components/header/header';
import LeftNav from './left-nav';
import Mask from './mask';
import styles from './main-box.scss';
import { styleConfig } from '../server/app-config';
import { toChangeExchange, toChangeSystem } from '../model/action';
import { SYS_DCB, SYS_DWB } from '../server/define';
import Direct from './pages/direct';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class MainBox extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,
    children: PropTypes.any,
    location: PropTypes.object,
  };

  state = {
    isShowLeftNav: false,
  };

  selectExchange(exchangeData) {
    this.props.dispatch(toChangeExchange(exchangeData));
  }

  changeSystem = (type) => {
    switch (type) {
      case SYS_DCB:
        this.props.dispatch(toChangeSystem(SYS_DCB));
        break;
      case SYS_DWB:
        this.props.dispatch(toChangeSystem(SYS_DWB));
        break;
      default:
        console.log('err');
    }
  };

  showLeftNav = () => (location.href.includes('home') ?
    () => {
      this.setState({
        isShowLeftNav: true,
      }, () => { Mask.show(this.hideLeftNav); });
    } : null);

  hideLeftNav = () => {
    this.selectExchange(this.leftNav.getExchangeData());
    this.setState({
      isShowLeftNav: false,
    });
  };

  render() {
    const {
      dispatch,
      exchangeInfo: { exchangeList, systemList, ad },
      systemInfo: { navList, systemSortNum },
    } = this.props;
    const title = systemList.sort((a, b) => (a.sortNum - b.sortNum));
    return (ad ? <Direct dispatch={dispatch} /> :
    <div
      className="wrap"
      styleName={`${this.state.isShowLeftNav ? 'show-left-nav' : 'hide-left-nav'}`}
      style={{ paddingTop: styleConfig.headerH, paddingBottom: styleConfig.footerH }}
    >
      <LeftNav
        ref={(ref) => { this.leftNav = ref; }}
        dispatch={dispatch}
        exchangeList={exchangeList}
      />
      <header style={{ height: styleConfig.headerH }}>
        <Header
          title={title}
          titleCallBack={this.changeSystem}
          leftBtnCallBack={this.showLeftNav()}
          leftBtnTxt={<span className="left-nav-btn" />}
          hasLeftBtnIcon={false}
          titleIdx={systemSortNum - 1}
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

