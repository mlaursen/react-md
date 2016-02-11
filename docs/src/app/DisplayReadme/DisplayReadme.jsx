import React, { PropTypes } from 'react';
import classnames from 'classnames';

const DisplayReadme = ({ readme, marked, className }) => {
  return (
    <article
      className={classnames('documentation text-container', className)}
      dangerouslySetInnerHTML={{ __html: marked(readme)}}
    />
  );
};

DisplayReadme.propTypes = {
  readme: PropTypes.string.isRequired,
  marked: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DisplayReadme;
