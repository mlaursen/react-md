import React, { PropTypes } from 'react';
import cn from 'classnames';
import { VERSION } from 'constants/application';

import './_app-footer.scss';
import QuickNavLink from './QuickNavLink';
import Contact from './Contact';
import Contribute from './Contribute';

const AppFooter = ({ className, previousTo, previousName, nextTo, nextName, dispatch, ...props }) => (
  <footer className={cn('md-grid app-footer', className)} {...props}>
    <nav className="quick-nav md-cell md-cell--12 md-grid md-grid--no-spacing">
      <QuickNavLink to={previousTo} name={previousName} label="Previous" icon="arrow_back" left />
      <QuickNavLink to={nextTo} name={nextName} label="Next" icon="arrow_forward" />
    </nav>
    <Contact />
    <Contribute />
    <p className="md-text-right md-cell md-cell--12">Current version: <i>{VERSION}</i></p>
  </footer>
);

AppFooter.propTypes = {
  className: PropTypes.string,
  previousTo: PropTypes.string,
  previousName: PropTypes.string,
  nextTo: PropTypes.string,
  nextName: PropTypes.string,
}

export default AppFooter;
