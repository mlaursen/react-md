/* eslint-disable no-console */
import React, { PropTypes } from 'react';
import MarkdownPage from 'components/Markdown/MarkdownPage';

import markdown from './README.md';

const Themes = ({ tab }) => {
  if (!tab) {
    return <MarkdownPage markdown={markdown} />;
  }

  return <h3>Wow!</h3>;
};

Themes.propTypes = {
  tab: PropTypes.number,
};

export default Themes;
