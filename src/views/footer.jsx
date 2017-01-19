import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './footer.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Footer extends Component {
  static propTypes = {
    navList: PropTypes.object,
  };

  state = {
    navNum: 0,
  };

  changeNav = (idx) => () => {
    this.setState({ navNum: idx });
  };

  render() {
    const { navList } = this.props;
    console.log(this.props);
    return (
      <ol className="table" styleName="footer">
        {
          Object.keys(navList).map((navItem, idx) => {
            const navClass = `${idx === this.state.navNum ? 'active' : ''}`;
            return (
              <li key={navList[navItem].name} className="td" styleName="nav-item">
                <Link to={navList[navItem].direction} onClick={this.changeNav(idx)}>
                  <span styleName={`${navList[navItem].name} ${navClass}`}>
                    {navList[navItem].label}
                  </span>
                </Link>
              </li>
            );
          })
        }
      </ol>

    );
  }
}

