import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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

  let componentDescription;
  if (description) {
    componentDescription = (
      <Markdown
        key="description"
        component="header"
        className="md-text-container md-cell md-cell--12"
        markdown={description}
      />
    );
  }

  return (
    <section style={style} className={cn('md-grid md-grid--40-16 examples-page', className)}>
      {componentDescription}
      {cards}
      {children}
    </section>
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
