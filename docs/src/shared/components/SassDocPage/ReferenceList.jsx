import React, { PropTypes } from 'react';
import cn from 'classnames';

import Markdown from 'components/Markdown';

const ReferenceList = ({ references, className, ...props }) => (
  <ul className={cn('md-list-unstyled sassdoc-section-end', className)} {...props}>
    {references.map(({ type, name, ref }) => (
      <li key={name} className="sassdoc-returns">
        [{type}]<Markdown markdown={`[${name}](${ref})`} />
      </li>
    ))}
  </ul>
);

ReferenceList.propTypes = {
  className: PropTypes.string,
  references: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    ref: PropTypes.string,
  })).isRequired,
};

export default ReferenceList;
