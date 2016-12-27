import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { changeSystem } from '../model/action';
import styles from './header.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Header extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemList: PropTypes.object.isRequired,
  };

  toChangeSystem = (type) => () => {
    switch (type) {
      case 'DCB':
        this.props.dispatch(changeSystem('DCB'));
        break;
      case 'DWB':
        this.props.dispatch(changeSystem('DWB'));
        break;
      default:
        alert('err');
    }
  };

  render() {
    const { systemList } = this.props;
    return (
      <div styleName="header">
        {
          Object.keys(systemList).sort((a, b) => (a - b)).map((sysItem) => (<button
            key={systemList[sysItem].type}
            onClick={this.toChangeSystem(systemList[sysItem].type)}
          >
            {systemList[sysItem].label}
          </button>))
        }
      </div>
    );
  }
}

