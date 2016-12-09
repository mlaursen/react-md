import React, { PureComponent, PropTypes, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import { TAB, ENTER } from '../constants/keyCodes';

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
     * An optional onClick function to call whent he user clicks the
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

    this.state = { pressed: false, tabFocused: false };
    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
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

    if ((e.which || e.keyCode) === ENTER) {
      this._handleClick(e);
    }
  }

  _handleKeyUp(e) {
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
  }

  _handleBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    if (this.state.tabFocused) {
      this.setState({ tabFocused: false });
    }
  }

  render() {
    const {
      component: Component,
      children,
      className,
      tabbedClassName,
      disabled,
      tabIndex,
      ink,
      ...props
    } = this.props;
    delete props.onBlur;
    delete props.onClick;
    delete props.onKeyUp;
    delete props.onKeyDown;
    delete props.onTabFocus;

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
