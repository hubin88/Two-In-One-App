/**
 * Created by kiny on 16/10/5.
 */

import React, { PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './table.scss';
import Row from './row';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Table extends React.Component {
  static defaultProps = {
    styles,
  };
  static propTypes = {
    fields: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onRowSelected: PropTypes.func,
    className: PropTypes.string,
    isEditable: PropTypes.bool,
    styles: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { checkAll: false, rowState: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.rowState.some(i => i === true)) return;
    this.reset(nextProps);
  }

  selectedRows = () => this.state.rowState.map((i, idx) => (i === true ? idx : null))
    .filter(i => i !== null);

  checkAllChange = () => {
    const checkState = !this.state.checkAll;
    this.setState({ checkAll: checkState, rowState: this.state.rowState.fill(checkState) });
    this.rowSelectCallback();
  };

  checkRow = (idx, value) => {
    this.state.rowState[idx] = value;
    const isAll = this.state.rowState.every(i => i === true);
    this.setState({ checkAll: isAll, rowState: this.state.rowState });
    this.rowSelectCallback();
  };

  rowSelectCallback() {
    if (this.props.onRowSelected) {
      this.props.onRowSelected(this.selectedRows());
    }
  }

  resetTable() {
    this.reset(this.props);
  }

  reset(props) {
    const rowState = (new Array(props.data.length)).fill(false);
    this.setState({ checkAll: false, rowState });
  }

  renderCheckAllCell() {
    return (
      <div styleName="cell">
        <input type="checkbox" checked={this.state.checkAll} onChange={this.checkAllChange} />
      </div>
    );
  }

  renderHeader() {
    return (
      <div styleName="header">
        {this.props.isEditable ? this.renderCheckAllCell() : null}
        {
          this.props.fields.map(rs =>
            <div styleName="cell" style={rs.style} key={rs.label}>{rs.label}</div>)
        }
      </div>
    );
  }

  renderRow() {
    return this.props.data.map((d, rowIdx) =>
      <Row
        isEditable={this.props.isEditable}
        key={rowIdx} data={d} index={rowIdx} checked={this.state.rowState[rowIdx]}
        callback={this.checkRow}
        fields={this.props.fields} styles={this.props.styles}
      />);
  }

  render() {
    return (
      <div>
        <div styleName="table" className={this.props.className}>
          {this.renderHeader()}
          <div styleName="body">
            {this.renderRow()}
          </div>
        </div>
      </div>
    );
  }
}
