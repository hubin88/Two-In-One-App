import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './footer.scss';

@cssModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class Footer extends Component {
  static propTypes = {
    navList: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navList } = this.props;
    return (
      <ol className="table" styleName="footer">
        {
          Object.keys(navList).map((navItem) => (
            <li
              key={navList[navItem].name}
              className="td" styleName={`nav-item ${navList[navItem].name}`}
            >
              <Link to={navList[navItem].direction}>
                <b />
                <span>{navList[navItem].label}</span>
              </Link>
            </li>
          ))
        }
      </ol>

    );
  }
}

