/**
 * Created by yjzhme on 2016/12/28.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './hold.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Hold extends Component {
  static propTypes() {

  }
  state = {
    content: [
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
      { a: '亚太银', b: '2', c: '3732', d: '10.00', e: '5' },
    ],
  }

  renderHeader() {
    return (
      <table styleName="header">
        <tbody>
          <tr>
            <td>名称</td>
            <td>数量</td>
            <td>建仓价</td>
            <td>定金</td>
            <td>止盈止损</td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderContent() {
    return (
      this.state.content.map((content, index) =>
        <table styleName="content-table" key={index}>
          <tbody>
            <tr>
              <td>{content.a}</td>
              <td>{content.b}</td>
              <td>{content.c}</td>
              <td>{content.d}</td>
              <td>{content.e}</td>
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
