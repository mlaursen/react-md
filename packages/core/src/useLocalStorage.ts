import { useCallback, useEffect, useRef, useState } from "react";
import { identity } from "./identity";
import { useSsr } from "./SsrProvider";
import type { UseStateSetter } from "./types";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/** @remarks \@since 6.0.0 */
export type LocalStorageSerializer<T> = (value: T) => string;
/** @remarks \@since 6.0.0 */
export type LocalStorageDeserializer<T> = (item: string) => T;

/** @remarks \@since 6.0.0 */
export interface LocalStorageHookOptions<T> {
  /**
   * The local storage key name to use.
   *
   * This can be set to an empty string for internal usage of conditionally
   * saving items to local storage.
   */
  key: string;

  /**
   * The default value to use if an item does not exist in local storage.
   */
  defaultValue: T;

  /**
   * Set this to `true` if the `value` should not persist to local storage
   * immediately whenever it changes. You will manually need to call
   * {@link LocalStorageHookReturnValue.persist} instead.
   *
   * @see {@link LocalStorageHookReturnValue.persist} for an example.
   * @defaultValue `false`
   */
  manual?: boolean;

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
   * @defaultValue `false`
   */
  raw?: boolean;

  /**
   * An optional function to serialize the `value` before storing it in local
   * storage.
   *
   * @defaultValue `JSON.stringify`
   */
  serializer?: LocalStorageSerializer<T>;

  /**
   * An optional function to deserialize the `value` if the item existed in
   * local storage.
   *
   * @defaultValue `JSON.parse`
   */
  deserializer?: LocalStorageDeserializer<T>;
}

export const defaultLocalStorageSerializer = <T>(value: T): string =>
  typeof value === "string" ? value : `${value}`;

const getItem = <T>(
  key: string,
  fallback: T,
  deserializer: LocalStorageDeserializer<T>
): T => {
  if (!key) {
    return fallback;
  }

  try {
    const value = localStorage.getItem(key);
    return !value ? fallback : deserializer(value);
  } catch (e) {
    return fallback;
  }
};

const setItem = <T>(
  key: string,
  value: T,
  serializer: LocalStorageSerializer<T>
): void => {
  if (!key) {
    return;
  }

  try {
    localStorage.setItem(key, serializer(value));
  } catch {
    //
  }
};

const removeItem = (key: string): void => {
  if (!key) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch {
    //
  }
};

/** @remarks \@since 6.0.0 */
export interface LocalStorageHookReturnValue<T> {
  value: T;

  /**
   * Updates the {@link value} in state. When the
   * {@link LocalStorageHookOptions.manual} option is `false`, the value will
   * also be updated in local storage immediately.
   */
  setValue: UseStateSetter<T>;

  /**
   * Remove the item from local storage.
   */
  remove(): void;

  /**
   * Manually persist the current {@link value} into local storage. This is only
   * useful if the {@link LocalStorageHookOptions.manual} option is `true`.
   *
   * @example
   * Manual Persisting
   * ```tsx
   * import type { ReactElement } from "react";
   *
   * function Example(): ReactElement {
   *   const { value, setValue, persist } = useLocalStorage({
   *     key: "someKey",
   *     manual: true,
   *   });
   *
   *   return (
   *     <>
   *       <Button onClick={closeDialog}>
   *         Cancel
   *       </Button>
   *       <Button
   *         onClick={async () => {
   *           await saveToDatabase(value);
   *           persist();
   *           closeDialog();
   *         }}
   *       >
   *         Confirm
   *       </Button>
   *     </>
   *   );
   * }
   * ```
   */
  persist(): void;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, setValue } = useLocalStorage({
 *   });
 *   return (
 *     <></>
 *   );
 * }
 * ```
 * @remarks \@since 6.0.0
 */
export function useLocalStorage<T>(
  options: LocalStorageHookOptions<T>
): LocalStorageHookReturnValue<T> {
  const {
    key,
    raw = false,
    defaultValue,
    manual = false,
    serializer = raw ? defaultLocalStorageSerializer : JSON.stringify,
    deserializer = raw && typeof defaultValue === "string"
      ? identity
      : JSON.parse,
  } = options;

  const ssr = useSsr();
  const [value, setStoredValue] = useState<T>(() => {
    if (ssr) {
      return defaultValue;
    }

    const value = getItem(key, defaultValue, deserializer);
    if (!manual) {
      setItem(key, value, serializer);
    }

    return value;
  });
  const config = useRef({
    key,
    value,
    manual,
    serializer,
    deserializer,
    defaultValue,
  } as const);
  useIsomorphicLayoutEffect(() => {
    config.current = {
      key,
      value,
      manual,
      serializer,
      deserializer,
      defaultValue,
    };
  });

  const setValue = useCallback<UseStateSetter<T>>((valueOrDispatcher) => {
    const { key, manual, serializer } = config.current;
    setStoredValue((prevValue) => {
      const nextValue =
        valueOrDispatcher instanceof Function
          ? valueOrDispatcher(prevValue)
          : valueOrDispatcher;

      if (!manual) {
        setItem(key, nextValue, serializer);
      }

      return nextValue;
    });
  }, []);

  const remove = useCallback(() => {
    removeItem(config.current.key);
  }, []);

  const persist = useCallback(() => {
    const { key, value, serializer } = config.current;
    setItem(key, value, serializer);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (manual) {
      return;
    }

    let valueToSave = value;
    if (ssr) {
      valueToSave = getItem(key, defaultValue, deserializer);
      setItem(key, valueToSave, serializer);
    }
    setValue(valueToSave);
  }, [key, ssr]);

  useEffect(() => {
    const callback = (event: StorageEvent | CustomEvent): void => {
      const { key, defaultValue, deserializer } = config.current;
      if (!("key" in event) || event.key === key) {
        setStoredValue(getItem(key, defaultValue, deserializer));
      }
    };

    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  }, []);

  return {
    value,
    setValue,
    remove,
    persist,
  };
}
