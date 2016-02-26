import React, { PropTypes } from 'react';

const Markdown = ({ markdown, marked, ...props }) => (
  <div {...props} dangerouslySetInnerHTML={{ __html: marked(markdown)}} />
);

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
  marked: PropTypes.func.isRequired,
};

export default Markdown;
