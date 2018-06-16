import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { GridList } from 'react-md';

import withMinHeight from 'components/hoc/withMinHeight';
import Markdown from './Markdown';

const MarkdownPage = ({ style, className, markdownStyle, markdownClassName, markdown }) => (
  <GridList
    component="section"
    size={12}
    style={style}
    className={className}
    cellStyle={markdownStyle}
    cellClassName={cn('md-text-container', markdownClassName)}
  >
    <Markdown markdown={markdown} component="div" />
  </GridList>
);

MarkdownPage.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  markdownStyle: PropTypes.object,
  markdownClassName: PropTypes.string,
  markdown: PropTypes.string,
};

MarkdownPage.defaultProps = {
  markdown: '',
};

export default withMinHeight(MarkdownPage);
