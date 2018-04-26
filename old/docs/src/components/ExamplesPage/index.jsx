import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { GridList } from 'react-md';

import Markdown from 'components/Markdown';
import withMinHeight from 'components/hoc/withMinHeight';

import './_styles.scss';
import ExampleCard from './ExampleCard';

const ExamplesPage = ({
  style,
  className,
  description,
  examples,
  children,
}) => {
  const cards = examples.map(example => <ExampleCard key={example.title} {...example} />);

  return (
    <GridList
      component="section"
      gutter={40}
      spacing={16}
      size={12}
      style={style}
      className={cn('examples-page', className)}
    >
      <Markdown component="header" className="md-text-container" markdown={description} />
      {cards}
      {children}
    </GridList>
  );
};

ExamplesPage.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  description: PropTypes.string,
  examples: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    tableCard: PropTypes.bool,
  })).isRequired,
  children: PropTypes.node,
};

export default withMinHeight(ExamplesPage);
