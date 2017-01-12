/**
 * Created by admin on 2017/1/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './left-nav.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class LeftNav extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    exchangeList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      exchangeId: 1,
      exchangeName: '海西亚太微交易',
      logoUrl: '/src/images/touxiang.jpg',
    };
  }

  getExchangeData = () => {
    const { exchangeId: id, exchangeName: name, logoUrl } = this.state;
    return { id, name, logoUrl };
  };

  choseExchange = (exchange) => {
    this.setState({
      exchangeId: exchange.id,
      exchangeName: exchange.name,
      logoUrl: exchange.logoUrl,
    });
  };

  render() {
    return (
      <div styleName="left-nav">
        <div styleName="header">
          <div>
            <div styleName="logo">
              <span><img src={this.state.logoUrl} role="presentation" /></span>
            </div>
            <div styleName="active-org-name">{this.state.exchangeName}</div>
          </div>
        </div>
        <div styleName="org-name">
          <ul styleName="list-name">
            {this.props.exchangeList.map((exchange) => (
              <li
                styleName={exchange.id === this.state.exchangeId ? 'active' : ''}
                key={exchange.id}
                onClick={() => { this.choseExchange(exchange); }}
              >
                {exchange.name}
                <span />
              </li>
            ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
