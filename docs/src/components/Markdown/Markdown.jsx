import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { withRouter } from 'react-router';

import Prism from 'utils/Prism';
import formatMarkdown from 'utils/formatMarkdown';
import ColorPreviewer from './ColorPreviewer';
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

  state = { html: { __html: null }, previewerKey: 0 };

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

      if (this.container) {
        this.forceUpdate();
      }
    }
  };

  updateLinks = () => {
    const { history } = this.props;
    if (!this.container) {
      return;
    }

    const links = this.container.querySelectorAll('a.link,a.quick-link__link');
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      if (!link.href.match(/sassdoc/) && link.href.match(/^(https?:\/\/(localhost|react-md).*\/)|(\?tab=(1|2)#.*)/)) {
        link.onclick = (e) => {
          e.preventDefault();
          const href = link.href.replace(window.location.origin, '');
          history.push(href);
        };
      }
    }
  };

  updateHTML = ({ markdown }) => {
    if (!markdown) {
      return;
    }

    const html = formatMarkdown(markdown);
    if (!this.state.html || this.state.html.__html !== html) {
      this.setState({
        html: { __html: formatMarkdown(markdown) },
        previewerKey: this.state.previewerKey + 1,
      }, this.highlight);
    }
  };

  highlight = () => {
    if (false && this.container) { // eslint-disable-line
      Prism.highlightAll();
    }
  };

  render() {
    const { html, previewerKey } = this.state;

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

    return [
      <Component
        {...props}
        key="markdown"
        ref={this.setContainer}
        dangerouslySetInnerHTML={html}
        className={cn('markdown-container', className)}
      />,
      <ColorPreviewer key={previewerKey} container={this.container} />,
    ];
  }
}

export default withRouter(PureMarkdown);
