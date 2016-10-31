import React, { PropTypes } from 'react';

import Markdown from 'components/Markdown';

const ScssMarkdown = ({ markdown, ...props }) => <Markdown {...props} markdown={`\`\`\`scss\n${markdown}\`\`\``} />;

ScssMarkdown.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default ScssMarkdown;
