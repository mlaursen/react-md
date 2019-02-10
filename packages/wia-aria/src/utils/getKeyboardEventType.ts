import React from "react";

import { IKey } from "../types.d";

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
export default function getKeyboardEventType(
  event: KeyboardEvent | React.KeyboardEvent,
  keys: IKey[]
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
