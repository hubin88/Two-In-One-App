/**
 * Created by admin on 2017/1/10.
 */

import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './left-nav.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: 1,
      orgName: '海西亚太微交易',
      imgurl: '../images/touxiang.jpg',
    };
  }

  choseOrg = (item) => {
    this.setState({
      orgId: item.id,
      orgName: item.text,
      imgurl: item.logoUrl,
    });
  };

  render() {
    const listArr = [
      { id: 1, text: '海西亚太微交易', logoUrl: '../images/touxiang.jpg' },
      { id: 2, text: '海西亚太微交易2', logoUrl: '../images/touxiang.jpg' },
      { id: 3, text: '海西亚太微交易3', logoUrl: '../images/touxiang.jpg' },
      { id: 4, text: '海西亚太微交易4', logoUrl: '../images/touxiang.jpg' },
      { id: 5, text: '海西亚太微交易5', logoUrl: '../images/touxiang.jpg' },
      { id: 6, text: '海西亚太微交易6', logoUrl: '../images/touxiang.jpg' },
      { id: 7, text: '海西亚太微交易7', logoUrl: '../images/touxiang.jpg' },
    ];
    return (
      <div styleName="left-nav">
        <div styleName="header">
          <div>
            <div styleName="logo"><span><img src={this.state.imgurl} role="presentation" /></span></div>
            <div styleName="active-org-name">{this.state.orgName}</div>
          </div>
        </div>
        <div styleName="org-name">
          <ul styleName="list-name">
            {listArr.map((item) => (
              <li
                styleName={item.id === this.state.orgId ? 'active' : ''}
                key={item.id}
                onClick={() => { this.choseOrg(item); }}
              >
                {item.text}
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
