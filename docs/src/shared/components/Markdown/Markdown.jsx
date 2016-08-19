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

export default class Markdown extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { markdown: marked(props.markdown) };
  }

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.any,
    markdown: PropTypes.string.isRequired,
  };

  static defaultProps = {
    component: 'div',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.markdown !== nextProps.markdown) {
      this.setState({ markdown: marked(nextProps.markdown) });
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
