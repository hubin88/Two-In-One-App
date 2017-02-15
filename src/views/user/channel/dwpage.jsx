/**
 * Created by dell on 2017/1/5.
 */
import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './page.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
class Dwpage extends Component {

  getPage = () =>
    <iframe src="/static/intro/intro.html" />;

  render() {
    return (
      <div styleName="page">
        {this.getPage()}
      </div>
    );
  }
}


export default Dwpage;

