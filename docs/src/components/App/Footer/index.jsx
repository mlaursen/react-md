import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './_styles.scss';

import QuickNav from './QuickNav';
import Contact from './Contact';
import Contribute from './Contribute';
import Version from './Version';

const Footer = ({ className, ...props }) => (
  <footer {...props} id="main-footer" className={cn('md-grid footer', className)}>
    <QuickNav />
    <Contact />
    <Contribute />
    <Version />
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
