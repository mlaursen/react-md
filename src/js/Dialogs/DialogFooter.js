import React, { PureComponent, PropTypes, Children, cloneElement, isValidElement } from 'react';
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
  };

  constructor(props) {
    super(props);

    this.state = { stacked: false };

    this._toElement = this._toElement.bind(this);
    this._generateActions = this._generateActions.bind(this);
    this._setContainer = this._setContainer.bind(this);
  }

  _setContainer(container) {
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
  }

  _toElement(action, index) {
    if (isValidElement(action)) {
      const button = Children.only(action);

      return cloneElement(action, {
        key: button.props.key || index,
        className: cn('md-btn--dialog', button.props.className),
        waitForInkTransition: true,
      });
    }

    return (
      <Button
        key={index}
        flat
        {...action}
        className={cn('md-btn--dialog', action.className)}
        waitForInkTransition
      />
    );
  }

  _generateActions() {
    const { actions } = this.props;
    if (Array.isArray(actions)) {
      return actions.map(this._toElement);
    }

    return this._toElement(actions);
  }

  render() {
    const { stacked } = this.state;
    let { className } = this.props;
    const { children, actions, ...props } = this.props;
    delete props.className;
    delete props.onActionMount;

    if (!actions || (Array.isArray(actions) && !actions.length)) {
      return null;
    }

    className = cn('md-dialog-footer', {
      'md-dialog-footer--inline': !stacked,
      'md-dialog-footer--stacked': stacked,
    }, className);

    return (
      <footer {...props} className={className} ref={this._setContainer}>
        {this._generateActions()}
        {children}
      </footer>
    );
  }
}
