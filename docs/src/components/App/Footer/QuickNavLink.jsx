import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

const QuickNavLink = ({ to, className, label, icon, name, left, titles, ...props }) => {
  if (!to) {
    return null;
  }

  let navTitles;
  if (titles) {
    navTitles = (
      <div className="footer__link-label">
        <h4 className="md-headline">{label}</h4>
        <h6 className="md-subheading-2">{name}</h6>
      </div>
    );
  }

  const fi = <FontIcon>{icon}</FontIcon>;
  return (
    <Link
      {...props}
      to={to}
      className={cn('footer__link', {
        'md-cell--right': !left,
      }, className)}
    >
      {left && fi}
      {navTitles}
      {!left && fi}
    </Link>
  );
};

QuickNavLink.propTypes = {
  left: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  titles: PropTypes.bool,
};

export default QuickNavLink;
