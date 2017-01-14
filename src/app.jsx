import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from './views/footer';
import Header from './views/header';
import LeftNav from './views/left-nav';
import Mask from './views/mask';

import './css/main.scss'; // import global css style
import { appStart, toChangeExchange } from './model/action';

class App extends Component {
  static defaultProps = {};
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowLeftNav: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(appStart());
  }

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
      // App root node
      <div className={`main ${this.state.isShowLeftNav ? 'show-left-nav' : 'hide-left-nav'}`}>
        <LeftNav
          ref={(ref) => { this.leftNav = ref; }}
          dispatch={dispatch}
          exchangeList={exchangeList}
        />
        <header>
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
        <footer>
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

export default connect(mapStateToProps)(App);
