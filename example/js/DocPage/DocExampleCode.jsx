import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import marked from 'marked';

import { Card, CardTitle, CardActions, FlatButton } from '../../../src/js';

const MIN_LINES = 14;
const DEFAULT_MAX_HEIGHT = Math.round(MIN_LINES * (16 * 1.5355));

export default class DocExampleCode extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isExpanded: false, maxHeight: DEFAULT_MAX_HEIGHT };
  }

  static propTypes = {
    code: PropTypes.string.isRequired,
  }

  componentWillMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: code => require('highlight.js').highlightAuto(code).value, // eslint-disable-line no-undef
    });
  }

  toggleExpanded = () => {
    const { isExpanded } = this.state;
    const maxHeight = isExpanded ? DEFAULT_MAX_HEIGHT : this.refs.code.scrollHeight;
    this.setState({ isExpanded: !isExpanded, maxHeight });
  }

  render() {
    const { isExpanded, maxHeight } = this.state;
    const html = `\`\`\`js
${this.props.code}
    \`\`\``;

    let actions;
    if((html.match(/\n/g) || []).length > MIN_LINES) {
      actions = (
        <CardActions>
          <FlatButton default onClick={this.toggleExpanded} label={`${isExpanded ? 'Retract' : 'Expand'} the example`} />
        </CardActions>
      );
    }
    return (
      <Card className="react-md-example-code">
        <CardTitle title="Example Code" />
        <div
          ref="code"
          className={classnames('md-card-text', { 'expanded': isExpanded })}
          dangerouslySetInnerHTML={{ __html: marked(html) }}
          style={{ maxHeight }}
        />
        {actions}
      </Card>
    );
  }
}
