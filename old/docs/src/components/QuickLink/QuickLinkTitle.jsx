import React from 'react';
import PropTypes from 'prop-types';
import { bem } from 'react-md';

import QuickLink from './QuickLink';

const QuickLinkTitle = ({ id, title, desktop }) => {
  if (!desktop) {
    return <span>{title}</span>;
  }

  return (
    <div className={bem('quick-link', 'container')}>
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
