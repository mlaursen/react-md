import React, { PropTypes } from 'react';

const DisplayReadme = ({ markdown, marked, ...props }) => (
  <article {...props} dangerouslySetInnerHTML={{ __html: marked(markdown)}} />
);

DisplayReadme.propTypes = {
  markdown: PropTypes.string.isRequired,
  marked: PropTypes.func.isRequired,
};

export default DisplayReadme;
