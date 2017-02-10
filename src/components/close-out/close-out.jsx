/**
 * Created by yjzhme on 2016/12/29.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { insertComponent, removeComponentByRef } from '../../ultils/helper';
import styles from './close-out.scss';

class CloseOut extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  }

  static show = (props) => {
    insertComponent(<Wrap {...props} />);
  }

  key = ['Price', 'Margin', 'float']

  kyeName = { Price: '建仓价', Margin: '数量', float: '盈亏' }

  cancel = () => {
    removeComponentByRef(this.CloseOut);
  }

  render() {
    console.log(this.props);
    return (
      <div styleName="close-out" ref={(ref) => { this.CloseOut = ref; }}>
        <div styleName="panel">
          <div styleName="title"><img src={require('../../images/me_icon_pay@2x.png')} alt="" />快速平仓</div>
          <hr styleName="line" />
          <div styleName="content">
            <table styleName="table">
              {this.key.map((item, index) =>
                <tr key={index}>
                  <td styleName="item">{this.kyeName[item]}</td>
                  <td styleName="value">{this.props[item]}</td>
                </tr>
              )}
            </table>
            <span styleName="cancel" onClick={this.cancel}>取消</span>
            <span styleName="confirm" onClick={this.cancel}>确定平仓</span>
          </div>
        </div>
      </div>
    );
  }
}

const Wrap = cssModules(CloseOut, styles, { errorWhenNotFound: false });
export default Wrap;
