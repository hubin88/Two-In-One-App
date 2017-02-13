/**
 * Created by dell on 2017/1/10.
 */

import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './hold.scss';
import styles2 from './hold-table.scss';
import { SYS_DCB, SYS_DWB } from '../../../server/define';
import CloseOut from '../../../components/close-out/close-out';
import Table from '../../../components/table/table';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Hold extends Component {
  static propTypes = {
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
  };

  state = {
    holdHeight: 0,
    holdBody: [],
  };

  onCover = (d) => {
    const de = d;
    de.float = 22;
    CloseOut.show(de);
  };

  holdHeaderList = (systemType) => {
    const obj = {
      [SYS_DCB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span><img src="" alt="" />{d.Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        { key: 'Price', label: '建仓价' },
        { key: 'earnest', label: '定金' },
        { key: 'range', label: '止盈止损' },
      ],
      [SYS_DWB]: [
        {
          key: 'name',
          label: '名称',
          render: (keyData, d) => (
            <span styleName={`${d.direction}`}><i />{d.Name}</span>
          ),
        },
        { key: 'Margin', label: '数量' },
        { key: 'Price', label: '建仓价' },
        { key: 'float', label: '盈亏', render: () => (<span>22</span>) },
        {
          key: 'cover',
          label: '操作',
          render: (keyData, d) => (
            <a href="#" onTouchTap={() => this.onCover(d)}>平仓</a>
          ),
        },
      ],
    };
    return obj[systemType];
  };

  nameList = [
    { name: 'allCash', label: '沥青盈亏', nums: '22' },
    { name: 'availableCash', label: '沥青盈亏', nums: '22' },
    { name: 'frozenCash', label: '沥青盈亏', nums: '22' },
    { name: 'frozenCashs', label: '沥青盈亏', nums: '22' },
  ];

  render() {
    const {
      systemInfo: {
        systemType,
        holdArray,
      },
    } = this.props;
    return (
      <div styleName="hold">
        <div styleName="holdValue-wrap">
          <div styleName="holdValue">
            <span>持仓总盈亏(元)</span>
            <p styleName="profit">88</p>
          </div>
          <ul styleName="nameList">
            {
              this.nameList.map((name) => (
                <li key={name.name}>
                  <p styleName="nums">{name.nums}</p>
                  <p styleName="label">{name.label}:</p>
                </li>
              ))
            }
          </ul>
        </div>
        <div styleName="holdList">
          {holdArray ?
            <Table
              ref={(ref) => { this.table = ref; }}
              fields={this.holdHeaderList(systemType)}
              data={holdArray}
              styles={styles2}
            /> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.exchangeInfo);
  return {
    exchangeInfo: state.exchangeInfo,
    systemInfo: state.systemInfo,
  };
}

export default connect(mapStateToProps)(Hold);

