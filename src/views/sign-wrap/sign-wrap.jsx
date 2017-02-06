/**
 * Created by admin on 2016/12/29.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import '../../css/main.scss';

class SignWrap extends Component {
  static propTypes = {
    systemInfo: PropTypes.object,
    exchangeInfo: PropTypes.object,
    children: PropTypes.any,
  };

  back = () => {
    window.history.go(-1);
  };

  render() {
    const { systemInfo, exchangeInfo: { systemList } } = this.props;
    let titleName = null;
    systemList.forEach((val) => {
      if (val.type === systemInfo.systemType) {
        titleName = val.label;
        return;
      }
    });
    return (
      <div className="content" ref={(ref) => { this.content = ref; }}>
        <header>
          <Header title={titleName} leftBtnCallBack={this.back} />
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    systemInfo: state.systemInfo,
    exchangeInfo: state.exchangeInfo,
  };
}

export default connect(mapStateToProps)(SignWrap);
