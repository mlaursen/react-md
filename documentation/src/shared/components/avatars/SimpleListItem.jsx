import React, { PropTypes } from 'react';

const SimpleListItem = ({ avatar, label }) => (
  <li className="md-list-tile md-list-tile--avatar">
    {avatar}
    <div className="md-text md-tile-text--primary md-tile-content--left-avatar">{label}</div>
  </li>
);

SimpleListItem.propTypes = {
  avatar: PropTypes.element.isRequired,
  label: PropTypes.node.isRequired,
};

export default SimpleListItem;
