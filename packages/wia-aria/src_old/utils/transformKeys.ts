import { KeyConfig, KeyboardFocusKeyType } from "../types.d";

/**
 * A small util function to transform a list of key codes into a list of
 * `IKeyboardFocusKeyEvent` objects. This is useful for how I determine what behavior
 * to implement after a keydown event.
 *
 * @param keys A list of key mappings to convert to a key object. These should be
 * things like: "Tab", "Alt+Home", "A", "Shift+Alt+ArrowUp"
 * @param type The keyboard focus type this key should be mapped to
 */
export default function transformKeys(
  keys: string[],
  type: KeyboardFocusKeyType
) {
  return keys.map<KeyConfig>(key => ({
    shiftKey: key.includes("Shift+"),
    metaKey: key.includes("Meta+"),
    altKey: key.includes("Alt+"),
    key: key.replace(/(Shift|Meta|Alt)\+/g, ""),
    type,
  }));
}
