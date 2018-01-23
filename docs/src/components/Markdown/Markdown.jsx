import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import formatMarkdown from 'utils/formatMarkdown';
import Prism from 'prismjs';
import { withRouter } from 'react-router';

import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/previewer-base/prism-previewer-base';
import 'prismjs/plugins/previewer-base/prism-previewer-base.css';
import 'prismjs/plugins/previewer-color/prism-previewer-color';
import 'prismjs/plugins/previewer-color/prism-previewer-color.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/show-language/prism-show-language';
import './_styles.scss';

export class PureMarkdown extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    markdown: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    staticContext: PropTypes.object,
    onHighlightFinish: PropTypes.func,
    lineNumbers: PropTypes.bool,
  };

  static defaultProps = {
    component: 'section',
    lineNumbers: true,
  };

  state = { html: { __html: null } };

  componentWillMount() {
    this.updateHTML(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (__DEV__ || this.props.markdown !== nextProps.markdown) {
      this.updateHTML(nextProps);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.html !== prevState.html) {
      this.updateLinks();
    }
  }

  setContainer = (container) => {
    if (process.env.NODE_ENV !== 'test') {
      this.container = findDOMNode(container);
      this.updateLinks();
    }
  };

  updateLinks = () => {
    const { history } = this.props;
    if (!this.container) {
      return;
    }

    const links = this.container.querySelectorAll('a');
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      if (!link.href.match(/sassdoc/)) {
        if (link.href.match(/^(https?:\/\/(localhost|react-md).*\/)|(\?tab=(1|2)#.*)/)) {
          link.onclick = (e) => {
            e.preventDefault();
            const href = link.href.replace(window.location.origin, '');
            history.push(href);
          };
        } else {
          link.rel = 'noopener noreferrer';
        }
      }
    }

    const headers = this.container.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (let i = 0; i < headers.length; i += 1) {
      const h = headers[i];
      if (h.id) {
        const link = document.createElement('a');
        link.href = `#${h.id}`;
        link.className = 'quick-link__link quick-link__link--markdown';

        const i = document.createElement('i');
        i.className = 'md-icon material-icons';
        i.innerHTML = 'link';
        i.setAttribute('title', `Quick Link to ${h.textContent}`);

        link.appendChild(i);
        link.onclick = (e) => {
          e.preventDefault();
          const href = link.href.replace(window.location.origin, '');
          history.push(href);
        };
        h.appendChild(link);
        h.classList.add('quick-link');
        h.classList.add('quick-link__container');
      }
    }
  };

  updateHTML = ({ markdown }) => {
    if (!markdown) {
      return;
    }

    this.setState({ html: { __html: formatMarkdown(markdown) } }, () => {
      if (this.container) {
        const pres = this.container.querySelectorAll('pre');
        for (let i = 0; i < pres.length; i += 1) {
          const pre = pres[i];
          const code = pre.querySelector('code');
          if (this.props.lineNumbers && code && code.innerHTML.match(/\r?\n.*\r?\n/)) {
            pre.classList.add('line-numbers');
          }

          Prism.highlightElement(code || pre, false, this.props.onHighlightFinish);
        }
      }
    });
  };

  render() {
    const { html } = this.state;

    const {
      component: Component,
      className,
      markdown,
      /* eslint-disable no-unused-vars */
      history,
      location,
      match,
      staticContext,
      lineNumbers,
      onHighlightFinish,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    if (!markdown) {
      return null;
    }

    return (
      <Component
        {...props}
        ref={this.setContainer}
        dangerouslySetInnerHTML={html}
        className={cn('markdown-container', className)}
      />
    );
  }
}

export default withRouter(PureMarkdown);
