import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './css/main.scss'; // import global css style

class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { dispatch, appState:{ data } } = this.props;
    return (
      // App root node
      <div>
        <header>
          <div className="tab">
            <span><a>点差宝</a></span>
            <span><a>点微宝</a></span>
          </div>
        </header>
        <section>
          {this.props.children}
        </section>
        <footer>
          <ul>
            <li><Link to="/deal">交易</Link></li>
            <li><Link to="/track">轨迹</Link></li>
            <li><Link to="/rule">规则</Link></li>
            <li><Link to="/info">我</Link></li>
          </ul>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState,
  };
}

export default connect(mapStateToProps)(App);
