/**
 * Created by Amg on 2017/1/20.
 */

import React, { Component, PropTypes } from 'react';
import AppConfig from '../../../server/app-config';
import Iframe from '../../../components/iframe/iframe';

class Page extends Component {
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

  render() {
    const title = this.htmlInfo.title;
    const directUrl = this.htmlInfo.url;
    return (
      <Iframe needHeader={false} title={title} htmlUrl={directUrl} />
    );
  }
}

export default Page;
