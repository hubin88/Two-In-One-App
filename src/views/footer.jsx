import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './footer.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Footer extends Component {

  static propTypes = {
    navList: PropTypes.object,
  };

  render() {
    const { navList } = this.props;
    return (
      <div>
        <div styleName="footer">
          <ol className="table">
            {
              Object.keys(navList).map((navItem) => (
                <li key={navList[navItem].name} className="td" styleName="nav-item">
                  <Link to={navList[navItem].direction}><span>{navList[navItem].label}</span></Link>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

