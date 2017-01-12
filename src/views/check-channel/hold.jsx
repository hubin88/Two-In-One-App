/**
 * Created by dell on 2017/1/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './hold.scss';
import styles2 from '../home/hold-table.scss';
import Table from '../../components/table/table';
import TopReturn from '../../components/topTeturn/topReturn';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Hold extends Component {
  static defaultProps = {
    title: '当前持仓',
  };
  static propTypes = {
    value: '',
    onCloseCallback: PropTypes.func,
    systemInfo: PropTypes.object,
    title: PropTypes.string,
  };

  state = {
    holdHeight: 0,
    holdBody: [],
  };

  onCover = (d) => {
    console.log('平仓', d);
  };

  holdHeader = () => {
    const obj = {
      dwb: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span><img src="" alt="" />{d.name}</span>
          ),
        },
        { key: 'mount', label: '数量' },
        { key: 'openPrice', label: '建仓价' },
        { key: 'float', label: '盈亏' },
        {
          key: '',
          label: '操作',
          render: (keyData, d) => (
            <a href="#" onClick={() => this.onCover(d)}>平仓</a>
          ),
        },
      ],
    };
    return obj.dwb;
  };

  nameList = [
    { name: 'allCash', label: '沥青盈亏', nums: '22' },
    { name: 'availableCash', label: '沥青盈亏', nums: '22' },
    { name: 'frozenCash', label: '沥青盈亏', nums: '22' },
    { name: 'frozenCashs', label: '沥青盈亏', nums: '22' },
  ];


  render() {
    return (
      <div styleName="hold">
        <TopReturn title={this.props.title} />
        <div styleName="holdValue">
          <span>持仓总盈亏(元)</span>
          <p styleName="profit">{this.props.value}</p>
        </div>
        <ul styleName="nameList">
          {
            this.nameList.map((name) => (
              <li key={name.name}>
                <span>{name.label}:</span>
                <span>{name.nums}</span>
              </li>
            ))
          }
        </ul>
        <div styleName="holdList">
          {
            <Table
              ref={(ref) => { this.table = ref; }}
              fields={this.holdHeader()}
              data={this.state.holdBody}
              className="txt-center"
              styles={styles2}
            />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Hold);

