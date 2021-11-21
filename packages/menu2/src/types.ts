import type { KeyboardEventHandler, MouseEventHandler } from "react";

/**
 * Whenever the menu becomes visible the menu gains focus for keyboard
 * functionality. Once the menu gains focus, the first item should normally be
 * focused by default unless the menu was opened by pressing the `"ArrowUp"`
 * key.
 *
 * Here are the valid focus types and the behavior:
 *
 * - `"self"` - The menu itself retains focus.
 * - `"first"` - The first focusable element within the menu gains focus
 * - `"last"` - The last focusable element within the menu gains focus.
 *
 * A "focusable" element will normally be one of the `MenuItem` components but
 * can also be a custom component that has registered itself as a focusable
 * element with the {@link useMenuFocusElement} hook.
 *
 * @defaultValue `"first"`
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#menubutton}
 * @remarks \@since 4.0.0
 */
export type MenuDefaultFocus = "self" | "first" | "last";

/** @remarks \@since 4.0.0 */
export interface MenuVisibilityState {
  /**
   * Boolean if the menu is currently visible
   *
   * @defaultValue `false`
   */
  visible: boolean;

  /** {@inheritdoc MenuDefaultFocus} */
  defaultFocus: MenuDefaultFocus;
}

/**
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#menubutton}
 * @typeParam ToggleElement - The `HTMLElement` type for the toggle component.
 * Defaults to `HTMLButtonElement`.
 * @typeParam MenuElement - The `HTMLElement` type for the menu component.
 * Defaults to `HTMLDivElement`
 * @remarks \@since 4.0.0
 */
export interface MenuVisibilityHookOptions<
  ToggleElement extends HTMLElement = HTMLButtonElement,
  MenuElement extends HTMLElement = HTMLDivElement
> {
  /**
   * This id will be set to the {@link MenuToggleRequiredProps.id} and used to
   * create the {@link MenuWidgetRequiredProps.id}.
   */
  toggleId: string;

  /**
   * An optional `aria-label` to provide to the menu element.
   *
   * @see {@link MenuWidgetRequiredProps.["aria-labelledby"]}
   * @see {@link MenuWidgetRequiredProps.["aria-label"]}
   */
  menuLabel?: string;

  /**
   * Boolean if the menu should display horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;

  /**
   * An optional `onClick` event handler that will be merged with the
   * {@link MenuWidgetRequiredProps.onClick} event handler.
   *
   * If this function calls `event.stopPropagation()`, the default keydown
   * behavior will not occur.
   */
  onMenuClick?: MouseEventHandler<MenuElement>;

  /**
   * An optional `onKeyDown` event handler that will be merged with the
   * {@link MenuWidgetRequiredProps.onKeyDown} event handler.
   *
   * If this function calls `event.stopPropagation()`, the default keydown
   * behavior will not occur.
   */
  onMenuKeyDown?: KeyboardEventHandler<MenuElement>;

  /**
   * An optional `onClick` event handler that will be merged with the
   * {@link MenuToggleRequiredProps.onClick} event handler.
   *
   * If this function calls `event.stopPropagation()`, the default click
   * behavior will not occur.
   */
  onToggleClick?: MouseEventHandler<ToggleElement>;

  /**
   * An optional `onKeyDown` event handler that will be merged with the
   * {@link MenuToggleRequiredProps.onKeyDown} event handler.
   *
   * If this function calls `event.stopPropagation()`, the default keydown
   * behavior will not occur.
   */
  onToggleKeyDown?: KeyboardEventHandler<ToggleElement>;
}

/**
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#menubutton}
 * @typeParam E - The `HTMLElement` type for the menu component. Defaults to
 * `HTMLDivElement`.
 * @remarks \@since 4.0.0
 */
export interface MenuWidgetRequiredProps<
  E extends HTMLElement = HTMLDivElement
> {
  /**
   * An optional `id` for an element that provides a label for the menu. This
   * will default to the {@link MenuVisibilityHookOptions.toggleId} unless the
   * {@link MenuVisibilityHookOptions.menuLabel} is provided.
   *
   * Note: Either the `aria-label` or `aria-labelledby` is required for
   * accessibility.
   */
  "aria-labelledby": string | undefined;

  /**
   * An optional label describing the purpose of the menu that will be set to
   * the {@link MenuVisibilityHookOptions.menuLabel}
   */
  "aria-label": string | undefined;

  /**
   * The orientation for the menu. This will be `"horizontal"` if
   * {@link MenuVisibilityHookOptions.horizontal} is set to `true`, otherwise
   * this will be `"vertical"`.
   *
   * @defaultValue `"vertical"`
   */
  "aria-orientation": "horizontal" | "vertical";

  /**
   * @see {@link MenuVisibilityHookOptions.toggleId}
   * @defaultValue `${toggleId}-menu`
   */
  id: string;

  /**
   * A mouse event handler that handles closing the menu when any child elements
   * are clicked.
   */
  onClick: MouseEventHandler<E>;

  /**
   * A keydown event handler that handles closing the menu if the escape key is
   * pressed.
   */
  onKeyDown: KeyboardEventHandler<E>;
}

/**
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices/#menubutton}
 * @typeParam E - The `HTMLElement` type for the toggle component. Defaults to
 * `HTMLButtonElement`.
 * @remarks \@since 4.0.0
 */
export interface MenuToggleRequiredProps<
  E extends HTMLElement = HTMLButtonElement
> {
  /**
   * This is set to `"menu"` to complete the menu button widget spec.
   */
  "aria-haspopup": "menu";

  /**
   * This will be set to `true` when the {@link MenuVisibilityState.visible} is
   * `true`, otherwise this will be `undefined`.
   */
  "aria-expanded": boolean | undefined;

  /**
   * An id required for accessibility. This will be set to the
   * {@link MenuVisibilityHookOptions.toggleId}
   */
  id: string;

  /**
   * A click handler that will toggle the visibility of the menu.
   */
  onClick: MouseEventHandler<E>;

  /**
   * A keydown handler that will show the menu if the `"ArrowUp"` or
   * `"ArrowDown"` keys are pressed while focusing this element.
   */
  onKeyDown: KeyboardEventHandler<E>;
}
