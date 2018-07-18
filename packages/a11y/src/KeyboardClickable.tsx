import * as React from "react";
import * as PropTypes from "prop-types";

export type KeyboardClickableRole = "button" | "treeitem" | "listitem" | "menuitem" | "option";
export type KeyboardClickableFocusEvent = React.FocusEvent<HTMLElement>;
export type KeyboardClickableFocusListener = (event: KeyboardClickableFocusEvent) => void;
export type KeyboardClickableKeyboardEvent = React.KeyboardEvent<HTMLElement>;
export type KeyboardClickableKeyboardListener = (event: KeyboardClickableKeyboardEvent) => void;
export type KeyboardClickableMouseEvent = React.MouseEvent<HTMLElement>;
export type KeyboardClickableMouseListener = (event: KeyboardClickableMouseEvent) => void;
export type KeyboardClickableTouchEvent = React.TouchEvent<HTMLElement>;
export type KeyboardClickableTouchListener = (event: KeyboardClickableTouchEvent) => void;

/**
 * These are the "options" or "config" for the clickable element.
 */
export interface IKeyboardClickableChildrenOptions {
  /**
   * When the `disabled` prop is true, this will be provided as `"true"` so it can be correctly applied to
   * the child element. Otherwise this value will be `undefined`.
   */
  "aria-disabled"?: "true";

  /**
   * The current role for the clickable element. This needs to be applied to the child element.
   */
  role: KeyboardClickableRole;

  /**
   * This will either be `0`, the provded `tabIndex` prop value, or `undefined`. This
   * will **always** be undefined if the `disabled` prop is `true`. It is set to `undefined`
   * because browsers will not apply the same "rules" as native clickable elements when disabled
   * and would still allow tab focus.
   */
  tabIndex?: number;

  /**
   * This will either be an updated keydown event listener or `undefined`. Like the `tabIndex`, this
   * will be `undefined` when the `disabled` prop is enabled. Otherwise, this will be a keydown
   * listener to correctly click when space or enter is pressed. This **needs** to be applied
   * to the child element to work as expected.
   */
  onKeyDown?: KeyboardClickableKeyboardListener;

  /**
   * An optional `keyup` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onKeyUp?: KeyboardClickableKeyboardListener;

  /**
   * An optional `focus` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onFocus?: KeyboardClickableFocusListener;

  /**
   * An optional `blur` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onBlur?: KeyboardClickableFocusListener;

  /**
   * An optional `mousedown` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onMouseDown?: KeyboardClickableMouseListener;

  /**
   * An optional `mouseup` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onMouseUp?: KeyboardClickableMouseListener;

  /**
   * An optional `click` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onClick?: KeyboardClickableMouseListener;

  /**
   * An optional `touchstart` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onTouchStart?: KeyboardClickableTouchListener;

  /**
   * An optional `touchend` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onTouchEnd?: KeyboardClickableTouchListener;
}

export interface IKeyboardClickableProps {
  /**
   * Boolean if the clickable element is disabled. When this is enabled, the keydown event handler and
   * tabIndex will be updated to be `undefined` to prevent focus or clicks.
   *
   * @docgen
   */
  disabled?: boolean;

  /**
   * The tab index for the clickable element. This needs to be a number greater than or equal to `0` if
   * the element should be focusable by the `Tab` key. If this element is only focusable by "programmatic"
   * events, this value should be `-1`.
   *
   * @docgen
   */
  tabIndex?: number;

  /**
   * The role that the clickable element should take on. This defaults to a "button" role.
   *
   * @docgen
   */
  role?: KeyboardClickableRole;

  /**
   * An optional `keydown` event handler. This will be called when the built-in `keydown` handler is called.
   *
   * @docgen
   */
  onKeyDown?: KeyboardClickableKeyboardListener;

  /**
   * A children renderer function that takes in the "new" props and applies them to the correct element that
   * should gain the clickable events and role.
   *
   * @docgen
   */
  children: (options: IKeyboardClickableChildrenOptions) => React.ReactNode;

  // ============================================================
  // Everything below is just for "convenience"
  // ============================================================

  /**
   * An optional `keyup` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onKeyUp?: KeyboardClickableKeyboardListener;

  /**
   * An optional `blur` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onBlur?: KeyboardClickableFocusListener;

  /**
   * An optional `focus` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onFocus?: KeyboardClickableFocusListener;

  /**
   * An optional `mousedown` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onMouseDown?: KeyboardClickableMouseListener;

  /**
   * An optional `mouseup` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onMouseUp?: KeyboardClickableMouseListener;

  /**
   * An optional `click` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onClick?: KeyboardClickableMouseListener;

  /**
   * An optional `touchstart` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onTouchStart?: KeyboardClickableTouchListener;

  /**
   * An optional `touchend` event listener. Nothing within the `KeyboardClickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onTouchEnd?: KeyboardClickableTouchListener;
}

export interface IKeyboardClickableDefaultProps {
  disabled: boolean;
  role: KeyboardClickableRole;
}

export type KeyboardClickableWithDefaultProps = IKeyboardClickableProps & IKeyboardClickableDefaultProps;

export default class KeyboardClickable extends React.Component<IKeyboardClickableProps, {}> {
  public static propTypes = {
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    role: PropTypes.oneOf(["button", "treeitem", "listitem", "menuitem", "option"]),
    onKeyDown: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  public static defaultProps: IKeyboardClickableDefaultProps = {
    disabled: false,
    role: "button",
  };

  public render() {
    const { disabled, children, role } = this.props as KeyboardClickableWithDefaultProps;

    let {
      tabIndex,
      onKeyUp,
      onBlur,
      onFocus,
      onClick,
      onMouseUp,
      onMouseDown,
      onTouchStart,
      onTouchEnd,
    } = this.props;

    if (disabled) {
      tabIndex = undefined;
      onKeyUp = undefined;
      onBlur = undefined;
      onFocus = undefined;
      onClick = undefined;
      onMouseUp = undefined;
      onMouseDown = undefined;
      onTouchStart = undefined;
      onTouchEnd = undefined;
    } else if (role === "menuitem") {
      tabIndex = -1;
    } else if (typeof tabIndex !== "number") {
      tabIndex = 0;
    }

    return children({
      "aria-disabled": disabled ? "true" : undefined,
      role,
      tabIndex,
      onBlur,
      onFocus,
      onClick,
      onMouseUp,
      onMouseDown,
      onTouchStart,
      onTouchEnd,
      onKeyUp,
      onKeyDown: disabled ? undefined : this.handleKeyDown,
    });
  }

  private handleKeyDown = (event: KeyboardClickableKeyboardEvent) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    const space = event.key === " ";
    if (space || event.key === "Enter") {
      if (space) {
        // prevent the page from scrolling
        event.preventDefault();
      }

      // this _should_ also focus it now that we have tab index
      event.currentTarget.click();
    }
  };
}
