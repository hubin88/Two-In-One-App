import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from './views/footer';
import Header from './views/header';
import LeftNav from './views/left-nav';
import './css/main.scss'; // import global css style
import { getCommodityAndServers, appStart } from './model/action';
import Mask from './views/mask';

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

  test() {
    this.props.dispatch(getCommodityAndServers());
  }

  showLeftNav = () => {
    this.setState({
      isShowLeftNav: true,
    }, () => { Mask.show(this.callback); });
  };

  hideLeftNav = () => {
    this.setState({
      isShowLeftNav: false,
    });
  };

  callback = () => {
    this.hideLeftNav();
  }

  render() {
    const {
      dispatch,
      exchangeInfo: { systemList },
      systemInfo: { navList },
    } = this.props;
    return (
      // App root node
      <div className={this.state.isShowLeftNav ? 'main show-left-nav' : 'main hide-left-nav'}>
        <LeftNav />
        <header>
          <Header dispatch={dispatch} systemList={systemList} showLeftNav={this.showLeftNav} />
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
