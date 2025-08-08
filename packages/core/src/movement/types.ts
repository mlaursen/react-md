import {
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
  type RefCallback,
  type RefObject,
} from "react";

import {
  type NonNullMutableRef,
  type NonNullRef,
  type UseStateSetter,
} from "../types.js";

/**
 * Set this to `"roving"` when:
 * - there are a group of focusable elements that have a `tabIndex={-1}`
 * - the container element defaults to having a `tabIndex={0}`
 * - if the container is focused, it should no longer be included in the normal
 *   tab flow. Instead, the current focused element should be included instead
 *   by changing its `tabIndex` from `-1` to `0`
 *
 * Set this to `"virtual"` when:
 * - the container element should never lose focus
 * - the "focused" element only gains focus styles instead of being focused
 * - the container element specifies an `aria-activedescendant` pointing to one
 *   of the ids for the child "focusable" elements
 *
 * @since 6.0.0
 */
export type TabIndexBehavior = "roving" | "virtual";

/**
 * This should be used for specific widgets that should not include all
 * focusable elements and instead only specific elements.
 *
 * @example
 * ```ts
 * const getExpansionPanelsOnly: GetFocusableElements = (container) =>
 *   [...container.querySelectorAll(".rmd-expansion-panel__button")];
 *
 * const getTreeItemsOnly: GetFocusableElements = (container) =>
 *   [...container.querySelectorAll("[role='treeitem']")];
 * ```
 *
 * @defaultValue `getFocusableElements`
 * @see the default `getFocusableElements` function.
 */
export type GetFocusableElements = (
  container: HTMLElement,
  programmatic: boolean
) => readonly HTMLElement[];

/**
 * @since 5.0.0
 */
export interface KeyboardMovementConfiguration {
  /**
   * A list of keys that will attempt to increment the focus index by 1.
   *
   * @defaultValue `["ArrowDown"]`
   */
  incrementKeys?: readonly string[];

  /**
   * A list of keys that will attempt to decrement the focus index by 1.
   *
   * @defaultValue `["ArrowUp"]`
   */
  decrementKeys?: readonly string[];

  /**
   * A list of keys that will set the focus index to `0`.
   *
   * @defaultValue `["Home"]`
   */
  jumpToFirstKeys?: readonly string[];

  /**
   * A list of keys that will set the focus index to the last focusable index.
   *
   * @defaultValue `["End"]`
   */
  jumpToLastKeys?: readonly string[];
}

/**
 * The defined {@link KeyboardMovementConfiguration} that should be used for
 * custom keyboard focus behavior.
 *
 * @since 5.0.0
 */
export type KeyboardMovementConfig = Required<KeyboardMovementConfiguration>;

/**
 * @since 5.0.0
 */
export interface KeyboardMovementBehavior {
  /**
   * Boolean if pressing a letter will focus the next item in the
   * {@link KeyboardMovementProvider} that starts with the same letter.
   *
   * @defaultValue `false`
   */
  searchable?: boolean;

  /**
   * Boolean if the {@link KeyboardMovementProvider} should allow the focus behavior
   * to loop from the first to last or last to first item instead of preventing
   * any new focus behavior. In other words... if the last item is focused and
   * the user presses a key that should advance the focus to the next focusable
   * element, should the focus stay on the current element or loop back and
   * focus the first focusable item.
   *
   * @defaultValue `false`
   */
  loopable?: boolean;

  /**
   * Boolean if elements that are `aria-disabled` or `disabled` should still be
   * able to gain focus.
   *
   * @defaultValue `false`
   */
  includeDisabled?: boolean;

  /**
   * Boolean if the keyboard movement is horizontal instead of vertical. This
   * updates the default keyboard config to use `ArrowRight` and `ArrowLeft`
   * instead of `ArrowDown` and `ArrowUp`,
   *
   * @since 5.1.2
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * @since 6.3.0
 * @since 6.4.0 Added `force` option.
 */
export interface KeyboardFocusFromKeyOptions {
  key: string;

  /**
   * @since 6.4.0
   * @defaultValue `false`
   */
  force?: boolean;

  /** @defaultValue `false` */
  reversed?: boolean;

  /** @defaultValue `getFocusableElementsFromRef()` */
  focusables?: readonly HTMLElement[];
}

/**
 * @since 6.3.0
 */
export type KeyboardFocusAction = (
  focusables?: readonly HTMLElement[],
  force?: boolean
) => void;

/**
 * @since 6.4.0
 */
export interface KeyboardMovementUpdateFocusIndexOptions {
  index: number;
  force?: boolean;
  focusables?: readonly HTMLElement[];
}

/**
 * @since 5.0.0
 * @since 6.0.0 Removed `attach`, `detach` and `watching`
 * @since 6.3.0 Added `focusFirst`, `focusLast`, `focusNext`, `focusPrevious`
 * and `focusFromKey`.
 * @since 6.4.0 Added `focusCurrent` and `updateFocusIndex`
 * @internal
 */
export interface KeyboardMovementContext
  extends Required<KeyboardMovementBehavior> {
  /** {@inheritDoc KeyboardMovementConfig} */
  config: NonNullRef<KeyboardMovementConfig>;

  /** @see {@link TabIndexBehavior} */
  tabIndexBehavior: TabIndexBehavior | undefined;

  /**
   * Note: This will only update if the {@link KeyboardMovementProviderOptions.tabIndexBehavior}
   * has been set to `"roving"` or `"virtual"`.
   */
  activeDescendantId: string;

  /**
   * @since 6.3.0
   */
  focusFirst: KeyboardFocusAction;

  /**
   * @since 6.3.0
   */
  focusLast: KeyboardFocusAction;

  /**
   * @since 6.3.0
   */
  focusNext: KeyboardFocusAction;

  /**
   * @since 6.3.0
   */
  focusPrevious: KeyboardFocusAction;

  /**
   * @since 6.3.0
   */
  focusFromKey: (options: KeyboardFocusFromKeyOptions) => void;

  /**
   * @since 6.4.0
   */
  focusCurrent: (
    focusables?: readonly HTMLElement[],
    force?: boolean
  ) => HTMLElement | undefined;

  /**
   * @since 6.4.0
   */
  updateFocusIndex: (options: KeyboardMovementUpdateFocusIndexOptions) => void;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface FocusableIndexOptions {
  focusables: readonly HTMLElement[];
  includeDisabled: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export type GetDefaultFocusedIndex = (options: FocusableIndexOptions) => number;

/**
 * @since 6.0.0
 * @internal
 */
export type ExtendKeyDown<E extends HTMLElement> = (
  movementData: KeyboardMovementExtensionData<E>
) => void;

/**
 * @since 6.0.0
 * @internal
 */
export interface KeyboardMovementFocusChangeEvent {
  index: number;
  element: HTMLElement;
}

/**
 * @since 6.0.0
 * @internal
 */
export type KeyboardMovementFocusChangeEventHandler = (
  event: KeyboardMovementFocusChangeEvent
) => void;

/**
 * @since 6.0.0
 * @internal
 */
export interface KeyboardMovementExtensionData<E extends HTMLElement>
  extends KeyboardMovementContext {
  event: KeyboardEvent<E>;
  currentFocusIndex: NonNullMutableRef<number>;
  setFocusIndex: (index: number, focusables: readonly HTMLElement[]) => void;
  setActiveDescendantId: (id: string) => void;
}

/**
 * @since 6.3.0
 */
export type KeyboardMovementEventHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onClick" | "onFocus" | "onKeyDown"
>;

/**
 * @since 6.3.0
 */
export interface SimpleKeyboardMovementWrapperOptions<E extends HTMLElement>
  extends KeyboardMovementEventHandlers<E> {
  ref?: Ref<E>;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface KeyboardMovementProviderOptions<E extends HTMLElement>
  extends KeyboardMovementBehavior,
    SimpleKeyboardMovementWrapperOptions<E>,
    KeyboardMovementConfiguration {
  /** @see {@link TabIndexBehavior} */
  tabIndexBehavior?: TabIndexBehavior;

  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * This is used to implement custom keyboard movement for the `keydown` event.
   */
  extendKeyDown?: ExtendKeyDown<E>;

  /**
   * Triggered whenever the focus changes.
   */
  onFocusChange?: KeyboardMovementFocusChangeEventHandler;

  /**
   * From what I've understood so far, programmatically focusable elements
   * should only be included when disabled elements via `aria-disabled` are
   * allowed.
   *
   * @defaultValue `includeDisabled`
   */
  programmatic?: boolean;

  /** @see {@link GetFocusableElements} */
  getFocusableElements?: GetFocusableElements;

  /**
   * This can be used to set the initial focus index whenever the container
   * element is first focused or the focus index is `-1` on other focus events.
   */
  getDefaultFocusedIndex?: GetDefaultFocusedIndex;

  /**
   * This was added to support editable combobox behavior. As the user types or
   * uses native input keyboard behavior, the focus index should be reset to
   * `-1` so that the next "ArrowDown" event focuses the first option again
   * instead of the last selected one.
   *
   * @defaultValue `false`
   */
  isNegativeOneAllowed?: boolean;

  /**
   * This was added to support spinbutton groups so the user can either use the
   * ArrowLeft, ArrowRight, or Tab keys to move. Without this, switching
   * between tab and the arrow keys would have the wrong tab index.
   *
   * @since 6.3.0
   * @defaultValue `false`
   */
  trackTabKeys?: boolean;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface KeyboardMovementProps<E extends HTMLElement>
  extends Required<KeyboardMovementEventHandlers<E>> {
  /**
   * This will only be provided if the {@link KeyboardMovementContext.tabIndexBehavior}
   * is set to `"virtual"`.
   */
  "aria-activedescendant"?: string;

  /**
   * This will not be provided if the {@link KeyboardMovementContext.tabIndexBehavior}
   * is `undefined`. Otherwise:
   * - `0` when `"virtual"`
   * - `0` when `"roving"` and the container element has not been focused at
   *   least once
   * - `-1` when `"roving"` and the container has been focused at least once
   *   - a child element **should** have a `tabIndex={0}` instead
   */
  tabIndex?: number;

  ref: RefCallback<E>;
}

/**
 * @since 6.0.0
 * @internal
 */
export interface KeyboardMovementProviderImplementation<E extends HTMLElement> {
  nodeRef: RefObject<E>;
  movementProps: Readonly<KeyboardMovementProps<E>>;
  movementContext: Readonly<KeyboardMovementContext>;
  currentFocusIndex: NonNullMutableRef<number>;
  activeDescendantId: string;
  setActiveDescendantId: UseStateSetter<string>;
}
