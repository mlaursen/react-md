import { createElement, PureComponent, PropTypes } from 'react';
import './_markdown.scss';

import marked from 'marked';

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
      return require('highlight.js').highlight(lang, code).value;
    } else {
      return code;
    }
  },
});

function formatMarkdown(props) {
  return marked(props.markdown.replace(/(\r?\n)(@see)/g, '$1$1$2'))
    .replace(/<pre><code/g, '<pre class="code-block"><code')
    .replace(/<ul/g, '<ul class="md-color--text"')
    .replace(/<p>@see/g, '<p style="margin-bottom:0">@see');
}

export default class Markdown extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.any,
    markdown: PropTypes.string.isRequired,
  };

  static defaultProps = {
    component: 'div',
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
    const { component, ...props } = this.props;
    delete props.markdown;

    return createElement(component, {
      ...props,
      dangerouslySetInnerHTML: {
        __html: markdown,
      },
    });
  }
}
