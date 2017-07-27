import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Markdown from 'components/Markdown';

const ReferenceList = ({ references, className, ...props }) => (
  <ul className={cn('md-list-unstyled sassdoc__section sassdoc__reference-list', className)} {...props}>
    {references.map(({ type, name, ref, url, caption }) => {
      if (url) {
        return <a key={url} href={url}>{caption || url}</a>;
      }

      return (
        <li key={name} className="sassdoc__reference-item">
          [{type}]<Markdown markdown={`[${name}](${ref})`} />
        </li>
      );
    })}
  </ul>
);

ReferenceList.propTypes = {
  className: PropTypes.string,
  references: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      caption: PropTypes.string,
    }),
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      ref: PropTypes.string,
    }),
  ])).isRequired,
};

export default ReferenceList;
