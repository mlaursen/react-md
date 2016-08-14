import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';

import Markdown from 'components/Markdown';
import { toClassName } from 'utils/StringUtils';

export default class Example extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    fallbackId: PropTypes.string.isRequired,
    tableCard: PropTypes.bool,
  };

  render() {
    const {
      title,
      code,
      className,
      children,
      fallbackId,
      description,
      tableCard,
      ...props,
    } = this.props;

    const markdown = `
\`\`\`js
${code}
\`\`\`
`;

    let resolvedChildren;
    let resolvedDescription = description && <Markdown key="desc" markdown={description} />;
    if (tableCard) {
      if (resolvedDescription) {
        resolvedChildren = [<CardText key="desc">{resolvedDescription}</CardText>, children];
      } else {
        resolvedChildren = children;
      }
    } else {
      resolvedChildren = (
        <CardText>
          {resolvedDescription}
          {children}
        </CardText>
      );
    }

    return (
      <Card
        {...props}
        tableCard={tableCard}
        id={title ? toClassName(title) : fallbackId}
        className={cn('component-example', className)}
        raise={false}
        iconChildren="code"
        expanderTooltipLabel="View the source code for thsi example"
      >
        <CardTitle title={title || 'Example'} isExpander />
        <Markdown markdown={markdown} expandable component={CardText} className="example-code" />
        {resolvedChildren}
      </Card>
    );
  }
}
