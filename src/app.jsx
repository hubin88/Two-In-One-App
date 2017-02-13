import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { appStart } from './model/action';

injectTapEventPlugin();

class App extends Component {
  static defaultProps = {};
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    props.dispatch(appStart());
  }

  render() {
    return (
      this.props.children
    );
  }
}

export default connect()(App);
