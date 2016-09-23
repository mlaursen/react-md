import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import Button from '../Buttons/Button';
import isInvalidAnimate from './isInvalidAnimate';

export default class Snackbar extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    onDismiss: PropTypes.func.isRequired,
    toast: PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func,
        }),
      ]),
    }).isRequired,
    multiline: PropTypes.bool,
    autohide: PropTypes.bool,
    autohideTimeout: PropTypes.number,
    fab: PropTypes.object,
    leaveTimeout: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this._clearTimeout = this._clearTimeout.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleAutohide = this._handleAutohide.bind(this);
    this._handleWindowBlur = this._handleWindowBlur.bind(this);
    this._handleWindowFocus = this._handleWindowFocus.bind(this);
  }

  componentWillMount() {
    const { fab, multiline } = this.props;
    if (!fab || isInvalidAnimate(fab)) {
      return;
    }

    this._fab = fab.getComposedComponent().getComposedComponent();
    this._fab._animateForSnackbar(multiline);
  }

  componentDidMount() {
    this._handleAutohide();
  }

  componentWillUnmount() {
    this._clearTimeout();

    if (this._eventType === 'focus') {
      window.removeEventListener('focus', this._handleWindowFocus);
    } else if (this._eventType === 'blur') {
      window.removeEventListener('blur', this._handleWindowBlur);
    }
  }

  _handleClick(e) {
    const { onDismiss, toast: { action }, leaveTimeout, multiline } = this.props;
    if (typeof action.onClick === 'function') {
      action.onClick(e);
    }

    if (this._fab) {
      this._fab._animateForSnackbar(multiline, leaveTimeout);
    }

    onDismiss();
  }

  _clearTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  _handleAutohide() {
    const { autohide, autohideTimeout, onDismiss, multiline, leaveTimeout } = this.props;
    if (!autohide) {
      return;
    }

    window.addEventListener('blur', this._handleWindowBlur);
    this._eventType = 'blur';
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this._eventType = null;

      window.removeEventListener('blur', this._handleWindowBlur);

      if (this._fab) {
        this._fab._animateForSnackbar(multiline, leaveTimeout);
      }

      onDismiss();
    }, autohideTimeout || this.state.toast);
  }

  _handleWindowBlur() {
    this._clearTimeout();
    window.removeEventListener('blur', this._handleWindowBlur);
    window.addEventListener('focus', this._handleWindowFocus);
    this._eventType = 'focus';
  }

  _handleWindowFocus() {
    window.removeEventListener('focus', this._handleWindowFocus);
    this._eventType = null;
    this._handleAutohide();
  }


  render() {
    const {
      className,
      toast,
      multiline,
      ...props,
    } = this.props;
    delete props.onDismiss;
    delete props.autohide;
    delete props.autohideTimeout;
    delete props.fab;
    delete props.leaveTimeout;
    let { text, action } = toast;

    let Component = 'p';
    if (action) {
      Component = 'section';
      text = <p className="md-snackbar--toast md-snackbar--action">{text}</p>;

      let btnProps = {
        flat: true,
        waitForInkTransition: true,
        onClick: this._handleClick,
        label: action,
        secondary: true,
        className: 'md-btn--snackbar',
      };

      if (typeof action !== 'string') {
        btnProps = Object.assign(btnProps, action, {
          className: cn(btnProps.className, action.className),
        });
      }

      action = <Button {...btnProps} />;
    }

    return (
      <Component
        {...props}
        role="alert"
        className={cn('md-snackbar', {
          'md-snackbar--multiline': multiline,
          'md-snackbar--toast': !action,
        }, className)}
      >
        {text}
        {action}
      </Component>
    );
  }
}
