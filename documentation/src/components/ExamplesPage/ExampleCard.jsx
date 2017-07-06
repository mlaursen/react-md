import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import { toCaterpillarCase } from 'utils/strings';

import Markdown from 'components/Markdown';

const ExampleCard = ({ title, description, code, children: propChildren, tableCard, ...props }) => {
  const markdown = `
\`\`\`js
${code}
\`\`\`
`;

  let descriptionMarkdown;
  if (description) {
    descriptionMarkdown = <Markdown key="description" markdown={description} className="md-text-container" />;
  }

  let children = propChildren;
  if (tableCard && description) {
    children = [<CardText key="description">{descriptionMarkdown}</CardText>, children];
  } else if (!tableCard) {
    children = <CardText key="example-card-text">{descriptionMarkdown}{children}</CardText>;
  }

  return (
    <Card
      id={toCaterpillarCase(title)}
      {...props}
      tableCard={tableCard}
      className={cn('md-cell md-cell--12')}
      expanderIconChildren="code"
      expanderTooltipLabel="View the source for this example."
      expanderTooltipDelay={300}
    >
      <CardTitle expander title={title} />
      <CardText expandable>
        <Markdown markdown={markdown} />
      </CardText>
      {children}
    </Card>
  );
};

ExampleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  code: PropTypes.string.isRequired,
  children: PropTypes.node,
  tableCard: PropTypes.bool,
};

export default ExampleCard;
