import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';

import Markdown from 'components/Markdown';
import { toClassName } from 'utils/StringUtils';

export default class Example extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional title for the code example.
     */
    title: PropTypes.string,

    /**
     * An optional description to apply to the code Example. This
     * is used if the description should not be included in the
     * source code.
     *
     * This value will automatically be parsed as markdown.
     */
    description: PropTypes.string,

    /**
     * The raw source code of the example to parse as markdown.
     */
    code: PropTypes.string.isRequired,

    /**
     * The code example to show.
     */
    children: PropTypes.node.isRequired,

    /**
     * Boolean if the example is a table to add additional styling.
     */
    tableCard: PropTypes.bool,

    /**
     * Injected from `DocPage.
     */
    fallbackId: PropTypes.string.isRequired,
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
        expanderTooltipLabel="View the source code for this example"
        expanderTooltipDelay={300}
      >
        <CardTitle title={title || 'Example'} isExpander />
        <Markdown markdown={markdown} expandable component={CardText} className="example-code" />
        {resolvedChildren}
      </Card>
    );
  }
}
