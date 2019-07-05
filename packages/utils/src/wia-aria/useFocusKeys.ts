import { useMemo } from "react";

export type KeyboardFocusKeyType = "increment" | "decrement" | "first" | "last";

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

/**
 * A small util function to transform a list of key codes into a list of
 * `IKeyboardFocusKeyEvent` objects. This is useful for how I determine what behavior
 * to implement after a keydown event.
 *
 * @param keys A list of key mappings to convert to a key object. These should be
 * things like: "Tab", "Alt+Home", "A", "Shift+Alt+ArrowUp"
 * @param type The keyboard focus type this key should be mapped to
 */
export function transformKeys(keys: string[], type: KeyboardFocusKeyType) {
  return keys.map<KeyConfig>(key => ({
    shiftKey: key.includes("Shift+"),
    metaKey: key.includes("Meta+"),
    altKey: key.includes("Alt+"),
    key: key.replace(/(Shift|Meta|Alt)\+/g, ""),
    type,
  }));
}

/**
 * A small util get the the `KeyboardFocusKeyType` based on the provided keys
 * and keyboard event. This ensures that the key, altKey, metaKey, and shiftKey
 * values all match.
 *
 * If a key is not found, `null` will be returned instead.
 *
 * @param event The event to get a key mapping type for
 * @param keys A list of key mappings to attempt to find a valid key event type
 * from.
 */
export function getKeyboardEventType(
  event: KeyboardEvent | React.KeyboardEvent,
  keys: KeyConfig[]
) {
  const { key, altKey, metaKey, shiftKey } = event;
  const found = keys.find(
    k =>
      k.key === key &&
      k.altKey === altKey &&
      k.metaKey === metaKey &&
      k.shiftKey === shiftKey
  );

  return (found && found.type) || null;
}

/**
 * A small hook that creates a memoized list of focus keys based on the provided
 * list of key strings. The `incrementKeys` will be defaulted to `"Tab"` if omitted
 * and the `decrementKeys` will be defaulted to `"Shift+Tab"`.
 */
export function useMemoizedFocusKeys({
  incrementKeys,
  decrementKeys,
  jumpToFirstKeys,
  jumpToLastKeys,
}: Required<KeyboardFocusKeys>) {
  return useMemo(
    () => [
      ...transformKeys(incrementKeys, "increment"),
      ...transformKeys(decrementKeys, "decrement"),
      ...transformKeys(jumpToFirstKeys, "first"),
      ...transformKeys(jumpToLastKeys, "last"),
    ],
    [incrementKeys, decrementKeys, jumpToFirstKeys, jumpToLastKeys]
  );
}
