import React from 'react';
import PropTypes from 'prop-types';
import { bem } from 'react-md';

import Markdown from 'components/Markdown';

const base = 'sassdoc';

const ReferenceList = ({ references, className, ...props }) => (
  <ul {...props} className={bem(base, 'reference-list', {}, bem(base, 'section'), 'md-list-unstyled', className)}>
    {references.map(({ type, name, ref, url, caption }) => {
      if (url) {
        return <a key={url} href={url}>{caption || url}</a>;
      }

      return (
        <li key={name} className={bem(base, 'reference-item')}>
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
