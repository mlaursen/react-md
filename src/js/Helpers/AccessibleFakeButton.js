import React, { PureComponent, PropTypes, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { SPACE, ENTER } from '../constants/keyCodes';

/**
 * The `AccessibleFakeButton` is a generic component that can be used to render
 * a `div` or any other non `button` components as a button. This should not be
 * used often.
 *
 * The `AccessibleFakeButton` allows the user to tab focus the element, use the
 * space or enter key to trigger the `onClick` event, and toggles the `aria-pressed`
 * attribute.
 */
export default class AccessibleFakeButton extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * Any children to display in the Accessible Fake Button.
     */
    children: PropTypes.node,

    /**
     * An optional onClick function to call whent he user clicks the
     * button or presses space || enter.
     */
    onClick: PropTypes.func,

    /**
     * An optional onKeyDown function to call.
     */
    onKeyDown: PropTypes.func,

    /**
     * The component to render the Fake button as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The tab index to use for the Fake button so it is keyboard focusable.
     */
    tabIndex: PropTypes.number,

    /**
     * Boolean if the Button is disabled. This will prevent tab focus.
     */
    disabled: PropTypes.bool,

    /**
     * The role for the accessible fake button. It is recommended to keep it
     * the default of `button` unless you are rendering it as an `a` tag.
     */
    role: PropTypes.string,

    /**
     * The ink when coming from the AccessibleFakeInkedButton
     * @access private
     */
    ink: PropTypes.node,
  };

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
    role: 'button',
  };

  constructor(props) {
    super(props);

    this.state = { pressed: false };
    this._setNode = this._setNode.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  /**
   * Focuses the button.
   */
  focus() {
    if (this._node) {
      this._node.focus();
    }
  }

  /**
   * Blurs the button.
   */
  blur() {
    if (this._node) {
      this._node.blur();
    }
  }

  _setNode(node) {
    if (node) {
      this._node = findDOMNode(node);
    }
  }

  _handleClick(e) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this._node.focus();
    this.setState({ pressed: !this.state.pressed });
  }

  _handleKeyDown(e) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if ([SPACE, ENTER].indexOf(e.which || e.keyCode) !== -1) {
      e.preventDefault();
      this._handleClick(e);
    }
  }

  render() {
    const {
      component: Component,
      children,
      className,
      disabled,
      tabIndex,
      ink,
      ...props
    } = this.props;
    delete props.onClick;
    delete props.onKeyDown;

    let childElements = children;
    if (ink) {
      childElements = Children.toArray(children);
      childElements.unshift(ink);
    }

    return (
      <Component
        {...props}
        ref={this._setNode}
        className={cn('md-fake-btn', {
          'md-pointer--hover': !disabled,
        }, className)}
        disabled={disabled}
        tabIndex={disabled ? null : tabIndex}
        onClick={this._handleClick}
        onKeyDown={this._handleKeyDown}
        aria-pressed={this.state.pressed}
      >
        {childElements}
      </Component>
    );
  }
}
