import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { TAB } from '../constants/keyCodes';
import handleKeyboardAccessibility from '../utils/EventUtils/handleKeyboardAccessibility';

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
     * An optional function to call only when the button has been focused with the tab key.
     */
    tabbedClassName: PropTypes.string,

    /**
     * Any children to display in the Accessible Fake Button.
     */
    children: PropTypes.node,

    /**
     * An optional onClick function to call when the user clicks the
     * button or presses space || enter.
     */
    onClick: PropTypes.func,

    /**
     * An optional onKeyDown function to call.
     */
    onKeyDown: PropTypes.func,

    /**
     * An optional onBlur function to call.
     */
    onBlur: PropTypes.func,

    /**
     * An optional onKeyUp function to call.
     */
    onKeyUp: PropTypes.func,

    /**
     * An optional function to call when the element is focused with the tab key.
     */
    onTabFocus: PropTypes.func,

    /**
     * The component to render the Fake button as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * Boolean if the default outline should be removed the when the fake button has been focused.
     *
     * @see {@link #tabbedClassName}
     */
    noFocusOutline: PropTypes.bool,

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

    /**
     * Boolean if the spacebar should be used to trigger the click event. This _should_ be `true`
     * is almost all cases.
     */
    listenToSpace: PropTypes.bool,

    /**
     * Boolean if the enter key should be used to trigger the click event. This _should_ be `true`
     * in most cases. By default, the param will be ignored if the `role` attribute is for a `checkbox`
     * or `radio`. When it is a checkbox or radio, it will attempt to submit the form on the enter
     * keypress instead like the native elements.
     */
    listenToEnter: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    tabIndex: 0,
    role: 'button',
    noFocusOutline: true,
    listenToEnter: true,
    listenToSpace: true,
  };

  state = { pressed: false, tabFocused: false };

  /**
   * Focuses the button.
   */
  focus = () => {
    if (this._node) {
      this._node.focus();
    }
  };

  /**
   * Blurs the button.
   */
  blur = () => {
    if (this._node) {
      this._node.blur();
    }
  };

  _setNode = (node) => {
    if (node) {
      this._node = findDOMNode(node);
    }
  };

  _handleClick = (e) => {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }

    this._node.focus();
    this.setState({ pressed: !this.state.pressed });
  };

  _handleKeyDown = (e) => {
    const { disabled, onKeyDown, listenToEnter, listenToSpace } = this.props;
    if (disabled) {
      return;
    }

    if (onKeyDown) {
      onKeyDown(e);
    }

    handleKeyboardAccessibility(e, this._handleClick, listenToEnter, listenToSpace);
  };

  _handleKeyUp = (e) => {
    const { onKeyUp, onTabFocus } = this.props;
    if (onKeyUp) {
      onKeyUp(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      if (onTabFocus) {
        onTabFocus(e);
      }

      this.setState({ tabFocused: true });
    }
  };

  _handleBlur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    if (this.state.tabFocused) {
      this.setState({ tabFocused: false });
    }
  };

  render() {
    const {
      component: Component,
      children,
      className,
      tabbedClassName,
      disabled,
      tabIndex,
      ink,
      noFocusOutline,
      /* eslint-disable no-unused-vars */
      onBlur,
      onClick,
      onKeyUp,
      onKeyDown,
      onTabFocus,
      listenToEnter,
      listenToSpace,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

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
          'md-fake-btn--no-outline': noFocusOutline,
          [tabbedClassName]: tabbedClassName && this.state.tabFocused,
        }, className)}
        disabled={disabled}
        tabIndex={disabled ? null : tabIndex}
        onBlur={this._handleBlur}
        onClick={this._handleClick}
        onKeyUp={this._handleKeyUp}
        onKeyDown={this._handleKeyDown}
        aria-pressed={this.state.pressed}
      >
        {childElements}
      </Component>
    );
  }
}
