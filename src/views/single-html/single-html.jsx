/**
 * Created by Amg on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import AppConfig from '../../server/app-config';
import Iframe from './iframe';

class SingleHtml extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const pathName = this.props.location.pathname;
    const singleHtml = AppConfig.singleHtml();
    this.htmlInfo = {};
    if (singleHtml[pathName.substring(1, singleHtml.length)]) {
      this.htmlInfo = singleHtml[pathName.substring(1, singleHtml.length)];
    }
  }

  back = () => {
    browserHistory.push(this.htmlInfo.backDirect);
  };

  render() {
    const title = this.htmlInfo.title;
    const directUrl = this.htmlInfo.url;
    return (
      <div className="wrap">
        <Iframe title={title} htmlUrl={directUrl} leftBtnFunc={this.back} />
      </div>
    );
  }
}

export default SingleHtml;
