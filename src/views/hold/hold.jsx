/**
 * Created by Amg on 2017/1/12.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './hold.scss';
import { insertComponent } from '../../ultils/helper';
import Table from '../../components/table/table';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class HoldWrap extends Component {

  static propTypes = {
    holdStyles: PropTypes.any,
  };

  static defaultProps = {
    holdStyles: styles,
  };

  layout() {
    // let rect;
    // if (this.props.parentRef === undefined) {
    //   const e = document.documentElement;
    //   rect = { left: 0, top: 0, width: e.clientWidth, height: e.clientHeight };
    // } else {
    //   rect = this.props.parentRef.getBoundingClientRect();
    // }
    // const r = this.tips.getBoundingClientRect();
    // const left = rect.left + ((rect.width - r.width) / 2);
    // const top = rect.top + ((rect.height - r.height) / 2);
    // const style = `top: ${top}px; left:${left}px;`;
    // this.tips.setAttribute('style', style);
  }

  render() {
    return (<Table
      ref={(ref) => { this.table = ref; }}
      fields={this.holdHeaderList()}
      data={this.state.holdBody}
      className="txt-center"
      styles={this.porps.holdStyles}
    />);
  }
}

export default class HoldBox extends HoldWrap {
  static show = (param, style = undefined) => {
    insertComponent(
      <HoldWrap
        {...param} style={style}
      />
    );
  };
}
