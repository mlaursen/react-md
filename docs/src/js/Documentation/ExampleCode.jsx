import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import marked from 'marked';

import './_markdown.scss';

export default class ExampleCode extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    markdown: PropTypes.string.isRequired,
    maxHeight: PropTypes.number.isRequired,
    isExpanded: PropTypes.bool.isRequired,
  };

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
      highlight: (code, lang) => require('highlight.js').highlight(lang, code).value, // eslint-disable-line no-undef
    });
  }

  render() {
    const { isExpanded, maxHeight, markdown } = this.props;
    return (
      <section
        className={classnames('markdown', { 'expanded': isExpanded })}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        style={{ maxHeight }}
      />
    );
  }
}
