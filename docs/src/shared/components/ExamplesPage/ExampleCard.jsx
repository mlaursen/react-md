import React, { PropTypes, Children } from 'react';
import cn from 'classnames';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

import toClassName from 'utils/StringUtils/toClassName';
import Markdown from 'components/Markdown';

const ExampleCard = ({ className, title, tableCard, description, code, fallbackId, children, ...props }) => {
  const markdown = `
\`\`\`js
${code}
\`\`\`
`;

  let exampleDescription;
  if (description) {
    exampleDescription = <Markdown key="description" markdown={description} className="md-text-container" style={{ marginBottom: 16 }} />;
  }

  let displayedChildren;
  if (tableCard) {
    if (exampleDescription) {
      displayedChildren = Children.map([<CardText key="description">{exampleDescription}</CardText>, children], child => child);
    } else {
      displayedChildren = children;
    }
  } else {
    displayedChildren = <CardText>{exampleDescription}{children}</CardText>;
  }

  return (
    <Card
      {...props}
      tableCard={tableCard}
      className={cn('md-cell md-cell--12 component-example', className)}
      expanderIconChildren="code"
      expanderTooltipLabel="View the source code for this example"
      expanderTooltipDelay={300}
    >
      <CardTitle
        expander
        id={title ? toClassName(title) : fallbackId}
        title={title || 'Example'}
      />
      <Markdown markdown={markdown} expandable component={CardText} />
      {displayedChildren}
    </Card>
  );
};

ExampleCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  tableCard: PropTypes.bool,
  description: PropTypes.string,
  code: PropTypes.string.isRequired,
  fallbackId: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ExampleCard;
