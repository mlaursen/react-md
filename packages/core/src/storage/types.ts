import { type UseStateInitializer, type UseStateSetter } from "../types.js";

/** @since 6.0.0 */
export type StorageSerializer<T> = (value: T) => string;

/** @since 6.0.0 */
export type StorageDeserializer<T> = (item: string) => T;

/** @since 6.0.0 */
export interface StorageSerializers<T> {
  /**
   * An optional function to serialize the `value` before storing it in local
   * storage.
   *
   * @defaultValue `JSON.stringify`
   */
  serializer?: StorageSerializer<T>;

  /**
   * An optional function to deserialize the `value` if the item existed in
   * local storage.
   *
   * @defaultValue `JSON.parse`
   */
  deserializer?: StorageDeserializer<T>;
}

/** @since 6.0.0 */
export interface StorageOptions<T> extends StorageSerializers<T> {
  /**
   * The storage key name to use. This can be set to an empty string for
   * internal usage of conditionally saving items to storage.
   */
  key: string;

  /**
   * The default value to use if an item does not exist in storage.
   */
  defaultValue: UseStateInitializer<T>;

  /**
   * Set this to `true` to update:
   *
   * - the default {@link serializer} to be:
   * ```
   * typeof value === "string" ? value : `${value}`
   * ```
   * - the default {@link deserializer} to not call `JSON.parse` if the
   *   {@link defaultValue} is a string.
   *
   * @defaultValue `typeof defaultValue === 'string'`
   */
  raw?: boolean;

  /**
   * Set this to `true` to require a manual `persist()` or `remove()` call
   * to update the storage value.
   *
   * @defaultValue `false`
   */
  manual?: boolean;

  /** @defaultValue `localStorage` */
  storage?: Storage;
}

/** @since 6.0.0 */
export interface StorageImplementation<T> {
  value: T;

  /**
   * Updates the {@link value} in state. When the
   * {@link StorageOptions.manual} option is `false`, the value will
   * also be updated in local storage immediately.
   */
  setValue: UseStateSetter<T>;

  /**
   * Remove the item from local storage.
   */
  remove: () => void;

  /**
   * Manually persist the current {@link value} into local storage. This is only
   * useful if the {@link StorageOptions.manual} option is `true`.
   */
  persist: () => void;
}
