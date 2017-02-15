/**
 * Created by dell on 2017/1/5.
 */
import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import Header from '../../../components/header/header';
import { Agreement } from '../../sign/agreement';
import styles from './page.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Dwpage extends Component {

  back = () => {
    window.history.go(-1);
  };

  render() {
    return (
      <div>
        <Header title={'点微宝介绍'} leftBtnCallBack={this.back} />
        <div styleName="content">
          {Agreement}
        </div>
      </div>
    );
  }
}

