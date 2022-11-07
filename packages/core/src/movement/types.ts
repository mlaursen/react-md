import type { FormEventHandler, KeyboardEventHandler } from "react";
import type { NonNullRef } from "../types";

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
 * @remarks \@since 5.0.0
 * @remarks \@since 6.0.0 Removed `attach`, `detach` and `watching`
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

export interface FocusableIndexOptions {
  focusables: readonly HTMLElement[];
  includeDisabled: boolean;
}

/**
 * @remarks \@since 6.0.0
 * @internal
 */
export interface VirtualFocusableIndexOptions {
  focusables: readonly HTMLElement[];
  activeDescendantId: string;
}

export type GetDefaultFocusedIndex = (options: FocusableIndexOptions) => number;

export interface FocusChangeEvent {
  index: number;
  element: HTMLElement;
}

export type KeyboardMovementFocusChangeEvent = (
  event: FocusChangeEvent
) => void;

export interface KeyboardMovementProviderOptions<E extends HTMLElement>
  extends KeyboardMovementBehavior,
    KeyboardMovementConfiguration {
  /** @see {@link TabIndexBehavior} */
  tabIndexBehavior?: TabIndexBehavior;

  onFocus?: FormEventHandler<E>;
  onKeyDown?: KeyboardEventHandler<E>;
  onFocusChange?: KeyboardMovementFocusChangeEvent;

  /**
   * From what I've understood so far, programmatically focusable elements
   * should only be included when disabled elements via `aria-disabled` are
   * allowed.
   *
   * @defaultValue `includeDisabled`
   */
  programmatic?: boolean;

  getFocusableElements?(
    container: HTMLElement,
    programmatic: boolean
  ): readonly HTMLElement[];
  getDefaultFocusedIndex?: GetDefaultFocusedIndex;
}

export interface KeyboardMovementProps<E extends HTMLElement> {
  "aria-activedescendant"?: string;
  tabIndex?: number;
  onFocus: FormEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
}

export interface KeyboardMovementProviderImplementation<E extends HTMLElement> {
  movementProps: Readonly<KeyboardMovementProps<E>>;
  movementContext: Readonly<KeyboardMovementContext>;
}
