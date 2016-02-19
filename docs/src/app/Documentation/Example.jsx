import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';

import Card, { CardText, CardTitle } from 'react-md/lib/Cards';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    markdown: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    marked: PropTypes.func.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const { children, markdown, marked, name, className, ...props } = this.props;
    const jsMarkdown = `\`\`\`js
${markdown}
    \`\`\``;

    return (
      <Card className={classnames('example', 'full-width', className)} {...props} raise={false} iconChildren="code">
        <CardTitle title={'Examples' + (name ? ' - ' + name : '')} isExpander={true} />
        <CardText expandable={true} className="markdown" dangerouslySetInnerHTML={{ __html: marked(jsMarkdown)}} />
        <CardText>{children}</CardText>
      </Card>
    );
  }
}
