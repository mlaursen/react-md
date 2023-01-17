import type {
  FocusEvent,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
} from "react";
import type { NonNullMutableRef, NonNullRef, UseStateSetter } from "../types";

/**
 * Set this to `"roving"` when:
 * - there are a group of focusable elemnets that have a `tabIndex={-1}`
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
 * @remarks \@since 6.0.0
 */
export type TabIndexBehavior = "roving" | "virtual";

/**
 * @remarks \@since 5.0.0
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
 * @remarks \@since 5.0.0
 */
export type KeyboardMovementConfig = Required<KeyboardMovementConfiguration>;

/**
 * @remarks \@since 5.0.0
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
   * @remarks \@since 5.1.2
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 Removed `attach`, `detach` and `watching`
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
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface FocusableIndexOptions {
  focusables: readonly HTMLElement[];
  includeDisabled: boolean;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export type GetDefaultFocusedIndex = (options: FocusableIndexOptions) => number;

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface FocusChangeEvent {
  index: number;
  element: HTMLElement;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export type KeyboardMovementFocusChangeEvent = (
  event: FocusChangeEvent
) => void;

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface KeyboardMovementExtensionData<E extends HTMLElement>
  extends KeyboardMovementContext {
  event: KeyboardEvent<E>;
  currentFocusIndex: NonNullMutableRef<number>;
  setFocusIndex(index: number, focusables: readonly HTMLElement[]): void;
  setActiveDescendantId(id: string): void;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface KeyboardMovementProviderOptions<E extends HTMLElement>
  extends KeyboardMovementBehavior,
    KeyboardMovementConfiguration {
  /** @see {@link TabIndexBehavior} */
  tabIndexBehavior?: TabIndexBehavior;

  onClick?(event: MouseEvent<E>): void;
  onFocus?(event: FocusEvent<E>): void;
  onKeyDown?(event: KeyboardEvent<E>): void;

  /**
   * This is used to implement custom keyboard movement for the `keydown` event.
   */
  extendKeyDown?(movementData: KeyboardMovementExtensionData<E>): void;

  /**
   * Triggered whenever the focus changes.
   */
  onFocusChange?: KeyboardMovementFocusChangeEvent;

  /**
   * From what I've understood so far, programmatically focusable elements
   * should only be included when disabled elements via `aria-disabled` are
   * allowed.
   *
   * @defaultValue `includeDisabled`
   */
  programmatic?: boolean;

  /**
   * This should be used for specific widgets that should not include all
   * focusable elements and instead only specific elements.
   *
   * @example
   * ```ts
   * const getExpansionPanelsOnly = (container: HTMLElement): readonly HTMLElement[] =>
   *   container.querySelectorAll(".rmd-expansion-panel__button");
   *
   * const getTreeItemsOnly = (container: HTMLElement): readonly HTMLElement[] =>
   *   container.querySelectorAll("[role='treeitem']");
   * ```
   *
   * @defaultValue `getFocusableElements`
   * @see the default `getFocusableElements` function.
   */
  getFocusableElements?(
    container: HTMLElement,
    programmatic: boolean
  ): readonly HTMLElement[];

  /**
   * This can be used to set the initial focus index whenever the container
   * element is first focused or the focus index is `-1` on other focus events.
   */
  getDefaultFocusedIndex?: GetDefaultFocusedIndex;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface KeyboardMovementProps<E extends HTMLElement> {
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
  onClick: MouseEventHandler<E>;
  onFocus: FocusEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface KeyboardMovementProviderImplementation<E extends HTMLElement> {
  movementProps: Readonly<KeyboardMovementProps<E>>;
  movementContext: Readonly<KeyboardMovementContext>;
  currentFocusIndex: NonNullMutableRef<number>;
  setActiveDescendantId: UseStateSetter<string>;
}
