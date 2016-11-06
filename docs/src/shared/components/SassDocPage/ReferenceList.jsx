import React, { PropTypes } from 'react';
import cn from 'classnames';

import VariableFormat from './VariableFormat';

const ReferenceList = ({ references, className, ...props }) => (
  <ul className={cn('md-list-unstyled sassdoc-section-end', className)} {...props}>
    {references.map(({ type, name }) => (
      <li key={name} className="sassdoc-returns">[{type}]<VariableFormat>{name}</VariableFormat></li>
    ))}
  </ul>
);

ReferenceList.propTypes = {
  className: PropTypes.string,
  references: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReferenceList;
