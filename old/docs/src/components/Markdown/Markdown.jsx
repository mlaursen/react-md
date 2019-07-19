import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { withRouter } from 'react-router';

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
      PropTypes.object,
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
    this.container = findDOMNode(container);
    this.updateLinks();

    if (this.container) {
      // Need the container persisted to the ColorPreviewer
      this.forceUpdate();
    }
  };

  /**
   * Update all local links except for the full Sassdoc page to use browser history
   * instead of the default behavior.
   */
  updateLinks = () => {
    const { history } = this.props;
    if (__TEST__ || !this.container) {
      return;
    }

    const links = this.container.querySelectorAll('a.link,a.quick-link__link');
    for (let i = 0; i < links.length; i += 1) {
      const link = links[i];
      if (!link.href.match(/sassdoc/) && link.href.match(/^(https?:\/\/(localhost|react-md\.mlaursen).*\/)|(\?tab=(1|2)#.*)/)) {
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

    const { lineNumbers } = this.props;
    const html = formatMarkdown(markdown, {
      showToolbar: lineNumbers,
      showLineNumbers: lineNumbers,
    });
    if (!this.state.html || this.state.html.__html !== html) {
      // Kind of cheating here. I want to force an update on the ColorPreviewer
      // whenever the markdown changes, so just increment some arbitrary key
      // whenever that happens so it will re-render.
      this.setState({
        html: { __html: html },
        previewerKey: this.state.previewerKey + 1,
      });
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
