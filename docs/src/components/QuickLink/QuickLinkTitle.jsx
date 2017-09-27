import React from 'react';
import PropTypes from 'prop-types';

import QuickLink from './QuickLink';

const QuickLinkTitle = ({ id, title, desktop }) => {
  if (!desktop) {
    return <span>{title}</span>;
  }

  return (
    <div className="quick-link__container">
      {title}
      <QuickLink id={id} title />
    </div>
  );
};

QuickLinkTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desktop: PropTypes.bool,
};

export default QuickLinkTitle;
