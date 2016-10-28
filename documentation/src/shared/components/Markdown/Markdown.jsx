import React, { PureComponent, PropTypes } from 'react';
import marked from 'marked';
import highlight from 'highlight.js';

import './_styles.scss';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    if (lang) {
      return highlight.highlight(lang, code).value;
    }

    return code;
  },
});

function formatMarkdown(props) {
  return marked(props.markdown.replace(/(\r?\n)(@see)/g, '$1$1$2'))
    .replace(/<pre><code/g, '<pre class="code-block"><code')
    .replace(/<ul/g, '<ul class="md-color--text"')
    .replace(/<p>@see/g, '<p style="margin-bottom:0">@see')
    .replace(/<blockquote><p/g, '<blockquote class="md-divider-border md-divider-border--left"><p className="md-color--secondary-text"');
}

export default class Markdown extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,
    children: (props, propName, component) => {
      if (typeof props[propName] !== 'undefined') {
        return new Error(
          `The \`${propName}\` was supplied to the ${component} component but it can not be used ` +
          'because it uses the `dangerouslySetInnerHTML` prop.'
        );
      }

      return null;
    },
    markdown: PropTypes.string.isRequired,
  };

  static defaultProps = {
    component: 'section',
  };

  constructor(props) {
    super(props);

    this.state = { markdown: formatMarkdown(props) };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markdown !== nextProps.markdown) {
      this.setState({ markdown: formatMarkdown(nextProps) });
    }
  }

  render() {
    const { markdown } = this.state;
    const { component: Component, ...props } = this.props;
    delete props.markdown;

    return <Component {...props} dangerouslySetInnerHTML={{ __html: markdown }} />;
  }
}
