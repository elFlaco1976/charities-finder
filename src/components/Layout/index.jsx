/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import './bootstrap.min.css';
import './reset.css';
import './styles.scss';

const Layout = ({ children, isMainPage }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <div>
          <header className={isMainPage ? 'header-main' : 'header-details'}>
            <h1>Time to help</h1>
            {isMainPage && (
              <>
                <p>Find inspiring projects,</p>
                <p>support them</p>
              </>
            )}
          </header>
          <div className="body-layout">{children}</div>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
