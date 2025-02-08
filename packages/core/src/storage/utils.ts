import {
  type StorageDeserializer,
  type StorageOptions,
  type StorageSerializer,
} from "./types.js";

/** @since 6.0.0 */
export type ModifyStorageOptions = Pick<
  StorageOptions<unknown>,
  "key" | "storage"
>;

/** @since 6.0.0 */
export interface GetItemFromStorageOptions<T> extends ModifyStorageOptions {
  /**
   * A value to use when the {@link key} does not exist in storage or there is
   * an error deserializing the value.
   */
  fallback: T;

  /** @see {@link StorageOptions.deserializer} */
  deserializer?: StorageDeserializer<T>;
}

/**
 * This is a low-level helper function get a value from storage (defaults to
 * `localStorage`). You'll most likely want to use a pre-built implementation
 * like `useStorage` instead.
 *
 * @example
 * ```ts
 * import { getItemFromStorage } from "@react-md/core/storage/utils";
 *
 * const values = ["a", "b", "c", "d"] as const;
 *
 * const item1 = getItemFromStorage({
 *   key: "testKey",
 *   fallback: values[0],
 *   deserializer(item) {
 *     if (!values.includes(item)) {
 *       return values[0]
 *     }
 *
 *     return item;
 *   },
 * });
 *
 * const item2 = getItemFromStorage({
 *   key: "anotherKey",
 *   fallback: -1,
 * });
 *
 * const item3 = getItemFromStorage({
 *   key: "anotherKey",
 *   fallback: -1,
 *   storage: sessionStorage,
 * });
 * ```
 *
 * @since 6.0.0
 */
export function getItemFromStorage<T>(
  options: GetItemFromStorageOptions<T>
): T {
  const {
    key,
    fallback,
    storage = globalThis.localStorage,
    deserializer = JSON.parse as StorageDeserializer<T>,
  } = options;
  if (!key) {
    return fallback;
  }

  try {
    const value = storage.getItem(key);
    return !value ? fallback : deserializer(value);
  } catch {
    return fallback;
  }
}

/** @since 6.0.0 */
export interface SetItemInStorageOptions<T> extends ModifyStorageOptions {
  value: T;

  /** @see {@link StorageOptions.serializer} */
  serializer?: StorageSerializer<T>;
}

/**
 * You'll most likely want to use `useStorage` instead, but this is a low-level
 * util to "safely" get an item from local storage.
 *
 * @example
 * ```ts
 * import { getItemFromStorage } from "@react-md/core/storage/utils";
 * import { identity } from "@react-md/core/utils/identity";
 *
 * const values = ["a", "b", "c", "d"] as const;
 *
 * setItemInStorage({
 *   key: "testKey",
 *   value: values[0],
 *   // store string value as-is
 *   serializer: identity,
 * });
 *
 * setItemInStorage({
 *   key: "anotherKey",
 *   value: 100,
 * });
 *
 * setItemInStorage({
 *   key: "anotherKey",
 *   value: 100,
 *   storage: sessionStorage,
 * });
 * ```
 *
 * @since 6.0.0
 */
export function setItemInStorage<T>(options: SetItemInStorageOptions<T>): void {
  const {
    key,
    value,
    storage = globalThis.localStorage,
    serializer = JSON.stringify,
  } = options;
  if (!key || !storage) {
    return;
  }

  try {
    const serialized = serializer(value);
    storage.setItem(key, serialized);
  } catch {
    // do nothing
  }
}

/**
 * @since 6.0.0
 */
export function removeItemFromStorage(options: ModifyStorageOptions): void {
  const { key, storage = globalThis.localStorage } = options;
  if (!key || !storage) {
    return;
  }

  try {
    storage.removeItem(key);
  } catch {
    // do nothing
  }
}
