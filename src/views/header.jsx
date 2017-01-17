import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { toChangeSystem } from '../model/action';
import styles from './header.scss';
import { SYS_DCB, SYS_DWB } from '../server/define';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Header extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    systemList: PropTypes.array.isRequired,
    isSingleSystem: PropTypes.bool.isRequired,
    showLeftNav: PropTypes.func,
    systemType: PropTypes.string.isRequired,
  };

  toChangeSystem = (type) => () => {
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

  showNav = () => {
    const url = location.href;
    let tpl = '';
    if (url.indexOf('home') > 1) {
      tpl = (<span styleName="left-nav-btn" onClick={this.props.showLeftNav} />);
    }
    return tpl;
  };

  render() {
    const { isSingleSystem, systemList, systemType } = this.props;
    return (
      <div styleName="head-nav">
        {this.showNav()}
        <div styleName="header">
          {
            systemList.sort((a, b) => (a.sort - b.sort)).map((sysItem) => {
              const btnBorder = `${isSingleSystem ? '' : 'btn-border'}`;
              const btnBg = `${sysItem.type === systemType ? 'btn-bg' : ''}`;
              return (<button
                styleName={`btn ${btnBorder} ${btnBg}`}
                key={sysItem.type}
                onClick={this.toChangeSystem(sysItem.type)}
              >
                {sysItem.label}
              </button>);
            })
          }
        </div>
      </div>

    );
  }
}

