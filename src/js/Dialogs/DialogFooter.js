import React, { PureComponent, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from '../Buttons/Button';

const FOOTER_PADDING = 8;

export default class DialogFooter extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    actions: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
      ])),
    ]),
    stacked: PropTypes.bool,
  };

  state = { stacked: false };

  _toElement(action, index) {
    if (isValidElement(action)) {
      const button = Children.only(action);

      return cloneElement(action, {
        key: button.key || index,
        className: cn('md-btn--dialog', button.props.className),
      });
    }

    // Both label and children are valid for dialog actions
    const { label, children, ...remaining } = action;
    return (
      <Button
        key={index}
        flat
        {...remaining}
        className={cn('md-btn--dialog', action.className)}
      >
        {label || children}
      </Button>
    );
  }

  _setContainer = (container) => {
    if (container !== null) {
      this._container = container;
      const maxWidth = (this._container.offsetWidth - (FOOTER_PADDING * 3)) / 2;

      let stacked = false;
      Array.prototype.slice.call(this._container.querySelectorAll('.md-btn'))
        .some(({ offsetWidth }) => {
          stacked = offsetWidth > maxWidth;
          return stacked;
        });

      this.setState({ stacked });
    }
  };

  _generateActions = () => {
    const { actions } = this.props;
    if (!actions) {
      return null;
    } else if (Array.isArray(actions)) {
      return actions.map(this._toElement);
    }

    return this._toElement(actions);
  };

  render() {
    const {
      actions,
      className,
      children,
      stacked: propStacked,
      ...props
    } = this.props;

    if (!children && (!actions || (Array.isArray(actions) && !actions.length))) {
      return null;
    }

    let { stacked } = this.props;
    const stackedDefined = typeof propStacked !== 'undefined';
    if (!stackedDefined) {
      stacked = this.state.stacked;
    }

    return (
      <footer
        {...props}
        className={cn('md-dialog-footer', {
          'md-dialog-footer--inline': !stacked,
          'md-dialog-footer--stacked': stacked,
        }, className)}
        ref={!stackedDefined ? this._setContainer : null}
      >
        {this._generateActions()}
        {children}
      </footer>
    );
  }
}
