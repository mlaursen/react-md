import React from 'react';
import PropTypes from 'prop-types';
import MarkdownPage from 'components/Markdown/MarkdownPage';
import ThemeBuilder from './ThemeBuilder';

import markdown from './README.md';

const Themes = ({ tab }) => {
  if (!tab) {
    return <MarkdownPage markdown={markdown} key="markdown" />;
  } else if (tab === 1) {
    return <ThemeBuilder key="theme" />;
  }

  return <h3>Wow!</h3>;
};

Themes.propTypes = {
  tab: PropTypes.number,
};

export default Themes;
