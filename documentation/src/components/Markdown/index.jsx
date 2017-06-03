import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import formatMarkdown from 'utils/formatMarkdown';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import './_styles.scss';

export default class Markdown extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    markdown: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    component: 'section',
  };

  state = { html: { __html: null } };

  componentWillMount() {
    this.updateHTML(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.markdown !== nextProps.markdown) {
      this.updateHTML(nextProps);
    }
  }

  updateHTML = ({ markdown }) => {
    this.setState({ html: { __html: formatMarkdown(markdown) } }, () => {
      // For some reason this doesn't work with the marked hightlight ability
      Prism.highlightAll();
    });
  };

  render() {
    const { html } = this.state;

    const {
      component: Component,
      className,
      /* eslint-disable no-unused-vars */
      markdown,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    return <Component {...props} dangerouslySetInnerHTML={html} className={cn('markdown-container', className)} />;
  }
}
