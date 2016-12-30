import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Footer from './views/footer';
import Header from './views/header';

import './css/main.scss'; // import global css style

class App extends Component {
  static defaultProps = {
  };
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeInfo: PropTypes.object.isRequired,
    systemInfo: PropTypes.object.isRequired,
    children: PropTypes.any,
  };

  render() {
    const {
      dispatch,
      exchangeInfo: { systemList },
      systemInfo: { navList },
    } = this.props;
    return (
      // App root node
      <div className="main">
        <header>
          <Header dispatch={dispatch} systemList={systemList} />
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
