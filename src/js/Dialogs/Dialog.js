import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import isValidFocusKeypress from '../utils/EventUtils/isValidFocusKeypress';
import FocusContainer from '../Helpers/FocusContainer';
import Paper from '../Papers';
import DialogTitle from './DialogTitle';
import DialogFooter from './DialogFooter';

export default class Dialog extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    'aria-labelledby': PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,
    title: PropTypes.node,
    children: PropTypes.node,
    contentComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
    actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
      ])),
    ]),
    initialFocus: PropTypes.string,
    pageX: PropTypes.number,
    pageY: PropTypes.number,
    fullPage: PropTypes.bool,
    onLeave: PropTypes.func,
    zDepth: PropTypes.number.isRequired,
    focusOnMount: PropTypes.bool,
    onOpen: PropTypes.func,
  };

  static defaultProps = {
    contentComponent: 'section',
    zDepth: 5,
  };

  constructor(props) {
    super(props);

    this.state = { transformOrigin: null };
    this._setContent = this._setContent.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  componentWillMount() {
    const { pageX, pageY } = this.props;
    if (!pageX || !pageY) {
      return;
    }

    this.setState({
      transformOrigin: `${pageX - window.scrollX}px ${pageY - window.scrollY}px`,
    });
  }

  componentDidMount() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  componentWillUnmount() {
    if (this.props.onLeave) {
      this.props.onLeave();
    }
  }

  _setContent(content) {
    if (content !== null) {
      this._content = findDOMNode(content);
      const contentPadded = this._content.querySelectorAll('.md-list').length === 0;

      this.setState({ contentPadded });
    }
  }

  _handleKeyDown(e) {
    if (!isValidFocusKeypress(e)) {
      return;
    }

    const { target, shiftKey } = e;
    const [first, ...focusables] = this._innerFocusables;
    const last = focusables[focusables.length - 1];

    if (shiftKey && target === first) {
      e.preventDefault();
      last.focus();
    } else if (!shiftKey && target === last) {
      e.preventDefault();
      first.focus();
    }
  }

  render() {
    const { contentPadded, transformOrigin } = this.state;
    const {
      id,
      className,
      contentStyle,
      contentClassName,
      title,
      contentComponent: Content,
      actions,
      children,
      fullPage,
      ...props,
    } = this.props;
    delete props.pageX;
    delete props.pageY;
    delete props.style;
    delete props.onOpen;
    delete props.onLeave;

    let { 'aria-labelledby': labelledBy, style } = this.props;
    const titleId = `${id}Title`;
    if (!labelledBy && title) {
      labelledBy = titleId;
    }

    const dialogChildren = fullPage
      ? children
      : [
        <DialogTitle key="title" id={titleId}>{title}</DialogTitle>,
        <Content
          ref={this._setContent}
          key="content"
          style={contentStyle}
          className={cn('md-dialog-content', {
            'md-dialog-content--padded': contentPadded,
          }, contentClassName)}
        >
          {children}
        </Content>,
        <DialogFooter key="footer" actions={actions} />,
      ];
    if (transformOrigin) {
      style = Object.assign({}, style, { transformOrigin });
    }

    return (
      <Paper
        {...props}
        component={FocusContainer}
        style={style}
        className={cn('md-background--card md-dialog', {
          'md-dialog--full-page': fullPage,
          'md-dialog--centered': !fullPage,
        }, className)}
        role="dialog"
        aria-labelledby={labelledBy}
      >
        {dialogChildren}
      </Paper>
    );
  }
}
