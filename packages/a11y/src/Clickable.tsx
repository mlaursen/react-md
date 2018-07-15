import * as React from "react";
import * as PropTypes from "prop-types";

export type ClickableRole = "button" | "menuitem" | "option";
export type ClickableFocusEvent = React.FocusEvent<HTMLElement>;
export type ClickableFocusListener = (event: ClickableFocusEvent) => void;
export type ClickableKeyboardEvent = React.KeyboardEvent<HTMLElement>;
export type ClickableKeyboardListener = (event: ClickableKeyboardEvent) => void;
export type ClickableMouseEvent = React.MouseEvent<HTMLElement>;
export type ClickableMouseListener = (event: ClickableMouseEvent) => void;
export type ClickableTouchEvent = React.TouchEvent<HTMLElement>;
export type ClickableTouchListener = (event: ClickableTouchEvent) => void;

/**
 * These are the "options" or "config" for the clickable element.
 */
export interface IClickableChildrenOptions {
  /**
   * When the `disabled` prop is true, this will be provided as `"true"` so it can be correctly applied to
   * the child element. Otherwise this value will be `undefined`.
   */
  "aria-disabled"?: "true";

  /**
   * The current role for the clickable element. This needs to be applied to the child element.
   */
  role: ClickableRole;

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
  onKeyDown?: ClickableKeyboardListener;

  /**
   * An optional `keyup` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onKeyUp?: ClickableKeyboardListener;

  /**
   * An optional `focus` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onFocus?: ClickableFocusListener;

  /**
   * An optional `blur` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onBlur?: ClickableFocusListener;

  /**
   * An optional `mousedown` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onMouseDown?: ClickableMouseListener;

  /**
   * An optional `mouseup` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onMouseUp?: ClickableMouseListener;

  /**
   * An optional `click` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onClick?: ClickableMouseListener;

  /**
   * An optional `touchstart` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onTouchStart?: ClickableTouchListener;

  /**
   * An optional `touchend` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   */
  onTouchEnd?: ClickableTouchListener;
}

export interface IClickableProps {
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
  role?: ClickableRole;

  /**
   * An optional `keydown` event handler. This will be called when the built-in `keydown` handler is called.
   *
   * @docgen
   */
  onKeyDown?: ClickableKeyboardListener;

  /**
   * A children renderer function that takes in the "new" props and applies them to the correct element that
   * should gain the clickable events and role.
   *
   * @docgen
   */
  children: (options: IClickableChildrenOptions) => React.ReactNode;

  // ============================================================
  // Everything below is just for "convenience"
  // ============================================================

  /**
   * An optional `keyup` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onKeyUp?: ClickableKeyboardListener;

  /**
   * An optional `blur` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onBlur?: ClickableFocusListener;

  /**
   * An optional `focus` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onFocus?: ClickableFocusListener;

  /**
   * An optional `mousedown` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onMouseDown?: ClickableMouseListener;

  /**
   * An optional `mouseup` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onMouseUp?: ClickableMouseListener;

  /**
   * An optional `click` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onClick?: ClickableMouseListener;

  /**
   * An optional `touchstart` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onTouchStart?: ClickableTouchListener;

  /**
   * An optional `touchend` event listener. Nothing within the `Clickable` component uses this function, but
   * it can be provided so that when `disabled`, this will be `undefined` so it is not applied to the
   * child element when disabled.
   *
   * @docgen
   */
  onTouchEnd?: ClickableTouchListener;
}

export interface IClickableDefaultProps {
  disabled: boolean;
  tabIndex: number;
  role: ClickableRole;
}

export type ClickableWithDefaultProps = IClickableProps & IClickableDefaultProps;

export default class Clickable extends React.Component<IClickableProps, {}> {
  public static propTypes = {
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    role: PropTypes.oneOf(["button", "menuitem", "option"]),
    onKeyDown: PropTypes.func,
    children: PropTypes.func.isRequired,
  };

  public static defaultProps: IClickableDefaultProps = {
    disabled: false,
    role: "button",
    tabIndex: 0,
  };

  public render() {
    const { disabled, children, role } = this.props as ClickableWithDefaultProps;

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

  private handleKeyDown = (event: ClickableKeyboardEvent) => {
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
