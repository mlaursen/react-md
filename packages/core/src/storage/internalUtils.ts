import { identity } from "../utils/identity.js";
import { type StorageDeserializer, type StorageSerializers } from "./types.js";

/**
 * @since 6.0.0
 * @internal
 */
export const defaultLocalStorageSerializer = (value: unknown): string =>
  typeof value === "string" ? value : `${value}`;

/**
 * @since 6.0.0
 * @internal
 */
export interface GetStorageSerializers<T> extends StorageSerializers<T> {
  raw?: boolean;
  initialValue: T;
}

/**
 * @since 6.0.0
 * @internal
 */
export function getStorageSerializers<T>(
  options: GetStorageSerializers<T>
): Required<StorageSerializers<T>> {
  const { initialValue } = options;

  // this allows for strings to automatically be stored as-is instead of adding
  // additional quotes around then with JSON.stringify
  const raw = options.raw ?? typeof initialValue === "string";
  const serializer =
    options.serializer ??
    (raw ? defaultLocalStorageSerializer : JSON.stringify);
  const deserializer: StorageDeserializer<T> =
    options.deserializer ??
    (raw && typeof initialValue === "string" ? identity : JSON.parse);

  return {
    serializer,
    deserializer,
  };
}
