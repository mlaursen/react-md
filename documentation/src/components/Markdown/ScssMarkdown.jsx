import React from 'react';
import PropTypes from 'prop-types';

import Markdown from 'components/Markdown';

const ScssMarkdown = ({ markdown, ...props }) => <Markdown {...props} markdown={`\`\`\`scss\n${markdown}\`\`\``} />;

ScssMarkdown.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default ScssMarkdown;
