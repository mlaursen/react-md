import React, { PropTypes } from 'react';
import cn from 'classnames';
import Collapse from 'react-md/lib/Helpers/Collapse';
import { VERSION } from 'constants/application';

import './_app-footer.scss';
import QuickNavLink from './QuickNavLink';
import Contact from './Contact';
import Contribute from './Contribute';

const AppFooter = ({ className, previousTo, previousName, nextTo, nextName, home, mobile, ...props }) => {
  delete props.dispatch;

  return (
    <footer className={cn('md-grid app-footer', className)} {...props}>
      <Collapse collapsed={home || (!previousName && !nextName)}>
        <nav className="quick-nav md-cell md-cell--12 md-grid md-grid--no-spacing">
          <QuickNavLink
            to={previousTo}
            titles={!mobile || !nextTo}
            name={previousName}
            label="Previous"
            icon="arrow_back"
            left
          />
          <QuickNavLink
            to={nextTo}
            name={nextName}
            label="Next"
            icon="arrow_forward"
            titles
          />
        </nav>
      </Collapse>
      <Contact />
      <Contribute />
      <p className="md-text-right md-cell md-cell--12">Current version: <i>{VERSION}</i></p>
    </footer>
  );
};

AppFooter.propTypes = {
  home: PropTypes.bool,
  dispatch: PropTypes.func,
  className: PropTypes.string,
  previousTo: PropTypes.string,
  previousName: PropTypes.string,
  nextTo: PropTypes.string,
  nextName: PropTypes.string,
  mobile: PropTypes.bool.isRequired,
};

export default AppFooter;
