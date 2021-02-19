import { FocusType, KeyConfig, MovementKey } from "./types";

/**
 * An extremely simple function that is used to generate an id for an item
 * within a list of other items.  This is generally used with list of items that
 * should have custom focus with the `aria-activedescendant` flow instead of
 * native focus.
 *
 * @param id - The base id for the container element of all the items.
 * @param i - The index of the item within the list. This number will be
 * incremented by 1 as an id to start from 1 instead of 0.
 */
export function getItemId(id: string, i: number): string {
  if (!id) {
    throw new Error("The id must be a string with a length greater than 0");
  }

  if (i < 0) {
    throw new RangeError("The provided index must be greater than 0");
  }

  return `${id}-item-${i + 1}`;
}

/**
 * A small util function to transform a list of key codes into a list of
 * `KeyConfig` objects. This is useful for how I determine what behavior to
 * implement after a keydown event.
 *
 * @param keys - A list of key mappings to convert to a key object. These should
 * be things like: "Tab", "Alt+Home", "A", "Shift+Alt+ArrowUp"
 * @param type - The keyboard focus type this key should be mapped to
 * @internal
 */
export function transformKeys(
  keys: readonly MovementKey[],
  type: FocusType
): KeyConfig[] {
  return keys.map<KeyConfig>((key) => ({
    shiftKey: key.includes("Shift+"),
    metaKey: key.includes("Meta+"),
    ctrlKey: key.includes("Control+"),
    altKey: key.includes("Alt+"),
    key: key.replace(/(Shift|Meta|Alt|Control)\+/g, ""),
    type,
  }));
}

/**
 * A small util get the `KeyConfig` based on the provided keys and keyboard
 * event. This ensures that the key, altKey, metaKey, and shiftKey values all
 * match.
 *
 * If a key is not found, `null` will be returned instead.
 *
 * @param event - The event to get a key mapping type for
 * @param keys - A list of key mappings to attempt to find a valid key event
 * type from.
 * @internal
 */
export function getKeyboardConfig(
  event: KeyboardEvent | React.KeyboardEvent,
  keys: readonly KeyConfig[]
): KeyConfig | null {
  const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
  return (
    keys.find(
      (k) =>
        k.key === key &&
        k.altKey === altKey &&
        k.ctrlKey === ctrlKey &&
        k.metaKey === metaKey &&
        k.shiftKey === shiftKey
    ) || null
  );
}

/**
 * Creates a stringified representation of the configuration so that the config
 * can be checked in the `onChange` callback for keyboard movement. This is used
 * as the `query` attribute on the change data.
 *
 * @param config - The key config to stringify
 * @internal
 */
export function getStringifiedKeyConfig(config: KeyConfig): string {
  const { key, altKey, ctrlKey, metaKey, shiftKey, type } = config;
  const suffix = [
    metaKey && "Meta",
    ctrlKey && "Control",
    shiftKey && "Shift",
    altKey && "Alt",
    key,
  ]
    .filter(Boolean)
    .join("+");

  return `${type}-${suffix}`;
}
