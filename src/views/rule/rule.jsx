import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from './rule.scss';
import SingleHtml from '../single-html/single-html';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Rule extends Component {
  static defaultProps = {
    htmlURL: 'rule(规则)h5地址url参数',
  };
  static propTypes = {
    htmlURL: PropTypes.string,
  };

  render() {
    return (
      <div styleName="rule">
        <SingleHtml htmlURL={this.props.htmlURL} />
      </div>
    );
  }
}

