import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Grid } from 'react-md';

import './_styles.scss';

import QuickNav from './QuickNav';
import Contact from './Contact';
import Contribute from './Contribute';
import Version from './Version';

const Footer = ({ className, ...props }) => (
  <Grid {...props} id="main-footer" component="footer" className={cn('footer', className)}>
    <QuickNav />
    <Contact />
    <Contribute />
    <Version />
  </Grid>
);

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
