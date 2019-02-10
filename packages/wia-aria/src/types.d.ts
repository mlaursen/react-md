import { HTMLAttributes, Ref } from "react";

import findMatchIndex from "./utils/findMatchIndex";

export type Maybe<T> = T | null;

/**
 * The value object to provide to the custom keyboard change event.
 */
export interface IKeyboardFocusChangeValue {
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
export type KeyboardFocusChangeEvent = (
  value: IKeyboardFocusChangeValue,
  event: KeyboardEvent | React.KeyboardEvent
) => void;

export type KeyboardFocusKeyType = "increment" | "decrement" | "first" | "last";
export type KeyboardFocusedId = string | null;

/**
 * A key object that is used to determine what type of behavior to do from
 * a keyboard event.
 */
export interface IKeyMapping {
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
export interface IKeyboardFocusKeys {
  incrementKeys?: string[];
  decrementKeys?: string[];
  jumpToFirstKeys?: string[];
  jumpToLastKeys?: string[];
}

export interface IWithKeyboardFocusChange {
  onKeyDown?: HTMLAttributes<HTMLElement>["onKeyDown"];
  onKeyboardFocus: KeyboardFocusChangeEvent;
}
