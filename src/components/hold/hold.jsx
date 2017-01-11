/**
 * Created by yjzhme on 2016/12/28.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import CloseOut from '../close-out/close-out';
import styles from './hold.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Hold extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    holdHeader: PropTypes.array,
    holdBody: PropTypes.array,
    holdKey: PropTypes.array,
  };

  onCloseOut = () => {
    CloseOut.show({ dispatch: this.props.dispatch });
  };

  // 表头
  renderHeader() {
    return (
      <tr>
        {
          this.props.holdHeader.map(rs =>
            <th style={rs.style} key={rs.label}>{rs.label}</th>)
        }
      </tr>
    );
  }

  // 列表
  renderBody() {
    return this.props.holdBody.map((d, rowIdx) =>
      <tr key={rowIdx}>
        {this.renderRow(d)}
      </tr>);
  }

  renderRow(data) {
    const { holdHeader } = this.props;
    return (
      holdHeader.map((field, cellIdx) => {
        let cell = data[field.key];
        if ('render' in field) {
          if (typeof field.render === 'function') {
            cell = field.render(data[field.key], data);
          }
        }
        return <td key={cellIdx}>{cell}</td>;
      })
    );
  }

  render() {
    console.log(this.props);
    return (
      this.props.holdBody.length === 0 ? null : (
        <table styleName="table">
          <thead styleName="t-head">{this.renderHeader()}</thead>
          <tbody styleName="t-body">{this.renderBody()}</tbody>
        </table>
      )
    );
  }
}

export default cssModules(Hold);
