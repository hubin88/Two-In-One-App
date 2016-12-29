/**
 * Created by yjzhme on 2016/12/28.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './hold.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Hold extends Component {
  static propTypes = {
    holdHeader: PropTypes.array,
    holdRecoder: PropTypes.array,
    holdKey: PropTypes.array,
  }

  closeOut = () => {
    alert('平仓');
  }

  // 持仓列表 表头
  renderHeader() {
    return (
      <table styleName="header">
        <tbody>
          <tr>
            {this.props.holdHeader.map((header, headerIndex) =>
              <td key={headerIndex}>{header}</td>
            )}
          </tr>
        </tbody>
      </table>
    );
  }

  // 持仓列表记录
  renderContent() {
    if (this.props.holdHeader.length === this.props.holdKey.length) {
      return (
        this.props.holdRecoder.map((recoder, recoderIndex) =>
          <table styleName="content-table" key={recoderIndex}>
            <tbody>
              <tr>
                {this.props.holdKey.map((key, keyIndex) =>
                  <td key={keyIndex}>{recoder[key]}</td>
                )}
              </tr>
            </tbody>
          </table>
        )
      );
    }
    return (
      this.props.holdRecoder.map((recoder, recoderIndex) =>
        <table styleName="content-table" key={recoderIndex}>
          <tbody>
            <tr>
              {this.props.holdKey.map((key, keyIndex) =>
                <td key={keyIndex}>{recoder[key]}</td>
              )}
              <td><span styleName="close-out" onClick={this.closeOut}>平仓</span></td>
            </tr>
          </tbody>
        </table>
      )
    );
  }

  render() {
    return (
      <div styleName="hold">
        {this.renderHeader()}
        <div styleName="content">
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default cssModules(Hold);
