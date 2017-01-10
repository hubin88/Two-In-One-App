import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { changeSystem } from '../model/action';
import styles from './header.scss';
import { SYS_DCB, SYS_DWB } from '../server/define';


@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Header extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemList: PropTypes.object.isRequired,
    showLeftNav: PropTypes.func,
  };

  toChangeSystem = (type) => () => {
    switch (type) {
      case SYS_DCB:
        this.props.dispatch(changeSystem(SYS_DCB));
        break;
      case SYS_DWB:
        this.props.dispatch(changeSystem(SYS_DWB));
        break;
      default:
        console.log('err');
    }
  };

  render() {
    const { systemList } = this.props;
    return (
      <div styleName="head-nav">
        <span styleName="left-nav-btn" onClick={this.props.showLeftNav} />
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
      </div>

    );
  }
}

