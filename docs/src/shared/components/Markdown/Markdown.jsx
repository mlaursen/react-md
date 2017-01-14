import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import withRouter from 'react-router/lib/withRouter';
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
    .replace(/<ul/g, '<ul class="md-text"')
    .replace(/<p>@see/g, '<p style="margin-bottom:0">@see')
    .replace(/<blockquote><p/g, '<blockquote class="md-divider-border md-divider-border--left"><p class="md-color--secondary-text"');
}

@withRouter
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

    // Injected from withRouter
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  };

  static defaultProps = {
    component: 'section',
  };

  constructor(props) {
    super(props);

    this.state = { markdown: formatMarkdown(props) };
  }

  componentDidMount() {
    this._updatedLinks();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markdown !== nextProps.markdown) {
      this.setState({ markdown: formatMarkdown(nextProps) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.markdown !== prevState.markdown) {
      this._updatedLinks();
    }
  }

  /**
   * Updates the local links so they use the browser history's pushstate instead of requiring a full page load
   * of new href. If it is an external host, it opens the link in a new tab and prevents the phishing of target="_blank"
   */
  _updatedLinks = () => {
    Array.prototype.slice.call(findDOMNode(this).querySelectorAll('a')).forEach(link => {
      if (link.href.match(/https?:\/\/(localhost|react-md).*\//)) {
        link.onclick = e => {
          e.preventDefault();
          const href = link.href.replace(window.location.origin, '');
          this.props.router.push(href);
        };
      } else {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  };

  render() {
    const { markdown } = this.state;
    const { component: Component, ...props } = this.props;
    delete props.markdown;
    delete props.params;
    delete props.router;
    delete props.location;
    delete props.routes;

    return <Component {...props} dangerouslySetInnerHTML={{ __html: markdown }} />;
  }
}
