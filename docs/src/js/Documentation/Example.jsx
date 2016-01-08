import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Card, CardText, CardTitle, CardActions, FlatButton } from 'react-md';
import ExampleCode from './ExampleCode';

const MIN_LINES = 14;
const DEFAULT_MAX_HEIGHT = Math.round(MIN_LINES * (14 * 1.453256)); // font-size and *random* line-height

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isExpanded: false,
      maxHeight: DEFAULT_MAX_HEIGHT,
    };
  }

  static propTypes = {
    markdown: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    marked: PropTypes.func.isRequired,
    name: PropTypes.string,
  };

  toggleExpanded = () => {
    const { isExpanded } = this.state;
    const maxHeight = isExpanded ? DEFAULT_MAX_HEIGHT : (ReactDOM.findDOMNode(this.refs.code).scrollHeight + 16);
    this.setState({ isExpanded: !isExpanded, maxHeight });
  };

  render() {
    const { children, markdown, marked, name } = this.props;
    const jsMarkdown = `\`\`\`js
${markdown}
    \`\`\``;

    let actions;
    if((jsMarkdown.match(/\n/g) || []).length > MIN_LINES) {
      actions = (
        <CardActions className="code-expander">
          <FlatButton default onClick={this.toggleExpanded} label={`${this.state.isExpanded ? 'Retract' : 'Expand'} the example`} />
        </CardActions>
      );
    }
    return (
      <Card className="example full-width">
        <CardTitle title={'Examples' + (name ? ' - ' + name : '')} />
        <CardText>{children}</CardText>
        <ExampleCode ref="code" marked={marked} markdown={jsMarkdown} {...this.state} />
        {actions}
      </Card>
    );
  }
}
