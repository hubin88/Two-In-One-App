import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import styles from './footer.scss';

const Footer = (props) => {
  const { navList } = props;
  return (
    <ol className="table" styleName="footer">
      {
        Object.keys(navList).map((navItem) => (
          <li key={navList[navItem].name} className="td" styleName="nav-item">
            <Link
              activeClassName="active-nav"
              to={navList[navItem].direction}
            >
              <span id={`${navList[navItem].name}`} styleName={`${navList[navItem].name}`}>
                {navList[navItem].label}
              </span>
            </Link>
          </li>
        ))
      }
    </ol>
  );
};

Footer.propTypes = {
  navList: PropTypes.object,
};

export default cssModules(Footer, styles, { allowMultiple: true, errorWhenNotFound: false });

