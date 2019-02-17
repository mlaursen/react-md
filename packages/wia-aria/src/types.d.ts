import { HTMLAttributes, Ref } from "react";

import findMatchIndex from "./utils/findMatchIndex";

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * The value object to provide to the custom keyboard change event.
 */
export interface KeyboardFocusChangeValue {
  /**
   * The element that should now have focus.
   */
  element: HTMLElement;

  /**
   * The index for the element that should now be focused from the
   * `focusableElements` list.
   */
  elementIndex: number;

  /**
   * A list of all the focusable elements for the event.
   */
  focusableElements: HTMLElement[];
}

/**
 * The change event function that gets called each time the keyboard focus changes
 * in any of the custom keyboard focus hooks.
 */
export type KeyboardFocusChangeEvent<E extends HTMLElement = HTMLElement> = (
  value: KeyboardFocusChangeValue,
  event: React.KeyboardEvent<E>
) => void;

export type KeyboardFocusKeyType = "increment" | "decrement" | "first" | "last";
export type KeyboardFocusedId = string | null;

/**
 * A key object that is used to determine what type of behavior to do from
 * a keyboard event.
 */
export interface KeyConfig {
  key: string;
  type: KeyboardFocusKeyType;
  altKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

/**
 * This interface is used to show how keyboard focus can be achieved with different
 * key presses. When any of the values are omitted, an empty list will be used instead.
 */
export interface KeyboardFocusKeys {
  incrementKeys?: string[];
  decrementKeys?: string[];
  jumpToFirstKeys?: string[];
  jumpToLastKeys?: string[];
}

export type EventHandlers<E extends HTMLElement = HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onKeyDown" | "onClick"
>;

export interface WithEventHandlers<H, E extends HTMLElement = HTMLElement> {
  handlers: EventHandlers<E> & H;
}

export type EventHandlersWithKeyDown<
  H,
  E extends HTMLElement = HTMLElement
> = WithEventHandlers<H, E> & Required<HTMLAttributes<E>["onKeyDown"]>;

export interface WithKeyboardFocusCallback {
  onKeyboardFocus?: KeyboardFocusChangeEvent;
}

export interface IKeyboardFocusState {
  focusedId: KeyboardFocusedId;
  isKeyboardMode: boolean;
}

export interface IKeyboardFocusContext extends IKeyboardFocusState {
  setFocusedId: (nextFocusedId: KeyboardFocusedId) => void;
}
