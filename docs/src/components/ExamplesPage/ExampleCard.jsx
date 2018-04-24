import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, SVGIcon, bem } from 'react-md';
import { toCaterpillarCase } from 'utils/strings';

import codeIcon from 'icons/code.svg';
import Markdown from 'components/Markdown';
import Title from './Title';

const ExampleCard = ({ title, description: propDescription, code, children: propChildren, tableCard, ...props }) => {
  let markdown = '';
  if (code !== null) {
    markdown = `
\`\`\`jsx
${code}
\`\`\`
`;
  }

  const description = (
    <Markdown
      key="description"
      component="div"
      markdown={propDescription}
      className={bem('examples-page', 'card', 'description', {}, 'md-text-container')}
    />
  );

  let children = propChildren;
  if (tableCard && description) {
    children = [
      <CardText key="description">{description}</CardText>,
      React.cloneElement(children, { key: 'table-card-example' }),
    ];
  } else if (!tableCard) {
    children = <CardText key="example-card-text">{description}{children}</CardText>;
  }

  const id = toCaterpillarCase(title.replace(/["'()'".:,]/g, '')).replace('-o-k-', '-ok-');

  return (
    <Card
      id={id}
      {...props}
      tabIndex={-1}
      tableCard={tableCard}
      expanderIcon={<SVGIcon use={codeIcon.url} />}
      expanderTooltipLabel="View the source for this example."
      expanderTooltipDelay={300}
    >
      <Title id={id} title={title} expander={!!code} />
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
  code: PropTypes.string,
  children: PropTypes.node,
  tableCard: PropTypes.bool,
  className: PropTypes.string,
};

export default ExampleCard;
