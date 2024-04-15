"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSsr } from "./SsrProvider.js";
import type { UseStateInitializer, UseStateSetter } from "./types.js";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect.js";
import { identity } from "./utils/identity.js";

/** @since 6.0.0 */
export type LocalStorageSerializer<T> = (value: T) => string;
/** @since 6.0.0 */
export type LocalStorageDeserializer<T> = (item: string) => T;

/** @since 6.0.0 */
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
  defaultValue: UseStateInitializer<T>;

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
   * @defaultValue `typeof defaultValue === 'string'`
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

/**
 * @since 6.0.0
 */
export const defaultLocalStorageSerializer = <T>(value: T): string =>
  typeof value === "string" ? value : `${value}`;

/** @since 6.0.0 */
export interface GetItemFromStorageOptions<T> {
  /**
   * The storage key to use
   */
  key: string;

  /**
   * A value to use when the {@link key} does not exist in storage or there is
   * an error deserializing the value.
   */
  fallback: T;

  /** @see {@link LocalStorageHookOptions.deserializer} */
  deserializer?: LocalStorageDeserializer<T>;

  /** @defaultValue `localStorage` */
  storage?: Storage;
}

/**
 * You'll most likely want to use {@link useLocalStorage} instead, but this is a
 * low-level util to "safely" get an item from local storage.
 *
 * @example
 * ```ts
 * import { getItemFromStorage } from "@react-md/core";
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
export const getItemFromStorage = <T>(
  options: GetItemFromStorageOptions<T>
): T => {
  const {
    key,
    fallback,
    storage = localStorage,
    deserializer = JSON.parse,
  } = options;
  if (!key) {
    return fallback;
  }

  try {
    const value = storage.getItem(key);
    return !value ? fallback : deserializer(value);
  } catch (e) {
    return fallback;
  }
};

/** @since 6.0.0 */
export interface SetItemInStorageOptions<T> {
  key: string;
  value: T;
  /** @defaultValue `localStorage` */
  storage?: Storage;

  /** @see {@link LocalStorageHookOptions.serializer} */
  serializer?: LocalStorageSerializer<T>;
}

/**
 * You'll most likely want to use {@link useLocalStorage} instead, but this is a
 * low-level util to "safely" get an item from local storage.
 *
 * @example
 * ```ts
 * import { identity, getItemFromStorage } from "@react-md/core";
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
export const setItemInStorage = <T>(
  options: SetItemInStorageOptions<T>
): void => {
  const {
    key,
    value,
    storage = localStorage,
    serializer = JSON.stringify,
  } = options;
  if (!key) {
    return;
  }

  try {
    storage.setItem(key, serializer(value));
  } catch {
    //
  }
};

/**
 * @since 6.0.0
 * @internal
 */
interface RemoveItemFromStorageOptions {
  key: string;

  /** @defaultValue `localStorage` */
  storage?: Storage;
}

/**
 * @since 6.0.0
 * @internal
 */
export const removeItemFromStorage = (
  options: RemoveItemFromStorageOptions
): void => {
  const { key, storage = localStorage } = options;
  if (!key) {
    return;
  }

  try {
    storage.removeItem(key);
  } catch {
    // do nothing
  }
};

/** @since 6.0.0 */
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
   * @example Manual Persisting
   * ```tsx
   * import type { ReactElement } from "react";
   *
   * function Example(): ReactElement {
   *   const { value, setValue, persist } = useLocalStorage({
   *     key: "someKey",
   *     manual: true,
   *     defaultValue: "",
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
 * @example Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { TextField, useLocalStorage } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { value, setValue } = useLocalStorage({
 *     key: "savedSearch",
 *     defaultValue: "",
 *   });
 *
 *   return (
 *     <TextField
 *       label="Search"
 *       placeholder="Search..."
 *       type="search"
 *       value={value}
 *       onChange={(event) => {
 *         setValue(event.currentTarget.value)
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * @example Type-safe Objects
 * ```tsx
 * import type { ReactElement } from "react";
 * import { useLocalStorage } from "@react-md/core";
 *
 * interface ExpectedSchema {
 *   label: string;
 *   value: string;
 *   // others
 * }
 *
 * function Example(): ReactElement {
 *   const { value, setValue } = useLocalStorage<ExpectedSchema | null>({
 *     key: "someKey",
 *     defaultValue: null,
 *
 *     // this is optional: you can create a custom deserializer to validate
 *     // the stored value to prevent people manually updating local storage in
 *     // the dev tools
 *     deserializer(item) {
 *       const parsed = JSON.parse(item):
 *       const { label, value } = parsed;
 *       if (typeof label !== 'string' || typeof value !== 'string') {
 *         return null;
 *       }
 *
 *       return { label, value };
 *     }
 *   });
 *
 *   // do something
 *   // value will be `ExpectedSchema | null`
 * }
 * ```
 *
 * @example Manual Persistence
 * ```tsx
 * import type { ReactElement } from "react";
 * import { Button, Checkbox, Form, useLocalStorage } from "@react-md/core";
 *
 * function Example(): ReactElement {
 *   const { value, setValue, remove, persist } = useLocalStorage({
 *     key: "someKey",
 *     manual: true,
 *     defaultValue: false,
 *   });
 *
 *   return (
 *     <Form
 *       onSubmit={() => {
 *         // current value will be saved into local storage
 *         persist();
 *       }}
 *       onReset={() => {
 *         // "someKey" will be removed from local storage
 *         remove();
 *       }}
 *     >
 *       <Checkbox
 *         label="Allow cookies"
 *         checked={value}
 *         onChange={(event) =>
 *           setValue(event.currentTarget.checked);
 *         }
 *       />
 *       <Button type="reset">Decline</Button>
 *       <Button type="submit">Save</Button>
 *     </Form>
 *   );
 * }
 * ```
 *
 * Note: Using the same local storage key in multiple parts in your app will not
 * update all instances with that value. The value will only be updated if it
 * was updated in a separate tab with the `"storage"` event. You must setup your
 * own context to share values or another state manager solution.
 *
 * @example Shared Value
 * ```tsx
 * const context = createContext(null);
 * const { Provider } = context;
 *
 * export function useSomeValue(): string {
 *   const value = useContext(context);
 *   if (!value) {
 *     throw new Error()
 *   }
 *
 *   return value;
 * }
 *
 * function Example({ children }: { children: ReactNode }) {
 *   const { value, setValue, remove, persist } = useLocalStorage({
 *     key: "someKey",
 *     defaultValue: "",
 *
 *     // optional
 *     manual: true,
 *   });
 *
 *   return (
 *     <Provider
 *       value={useMemo(() => ({
 *         value,
 *         setValue,
 *
 *         // remove and persist are optional
 *         remove,
 *         persist,
 *       }), [value, setValue, remove, persist])}
 *     >
 *       {children}
 *     </Provider>
 *   );
 * }
 *
 * function SomeChildComponent() {
 *   const { value, setValue } = useSomeValue();
 *   // do stuff
 * }
 * ```
 *
 * @since 6.0.0
 */
export function useLocalStorage<T>(
  options: LocalStorageHookOptions<T>
): LocalStorageHookReturnValue<T> {
  const { key, defaultValue, manual = false } = options;

  const [initialValue] = useState(defaultValue);
  // this allows for strings to automatically be stored as-is instead of adding
  // additional quotes around then with JSON.stringify
  const raw = options.raw ?? typeof initialValue === "string";
  const serializer =
    options.serializer ??
    (raw ? defaultLocalStorageSerializer : JSON.stringify);
  const deserializer =
    options.deserializer ??
    (raw && typeof initialValue === "string" ? identity : JSON.parse);

  const ssr = useSsr();
  const [value, setStoredValue] = useState<T>(() => {
    if (ssr) {
      return initialValue;
    }

    const value = getItemFromStorage({
      key,
      fallback: initialValue,
      deserializer,
    });
    if (!manual) {
      setItemInStorage({
        key,
        value,
        serializer,
      });
    }

    return value;
  });
  const config = useRef({
    key,
    value,
    manual,
    serializer,
    deserializer,
    defaultValue: initialValue,
  } as const);
  useIsomorphicLayoutEffect(() => {
    config.current = {
      key,
      value,
      manual,
      serializer,
      deserializer,
      defaultValue: initialValue,
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
        setItemInStorage({
          key,
          value: nextValue,
          serializer,
        });
      }

      return nextValue;
    });
  }, []);

  const remove = useCallback(() => {
    removeItemFromStorage({
      key: config.current.key,
    });
  }, []);

  const persist = useCallback(() => {
    const { key, value, serializer } = config.current;
    setItemInStorage({
      key,
      value,
      serializer,
    });
  }, []);

  useEffect(() => {
    const { defaultValue, deserializer, manual } = config.current;
    if (manual || !ssr) {
      return;
    }

    setValue(
      getItemFromStorage({
        key,
        fallback: defaultValue,
        deserializer,
      })
    );
  }, [key, ssr, setValue]);

  // update the value if another tab changed the local storage value
  useEffect(() => {
    if (!key) {
      return;
    }

    const callback = (event: StorageEvent): void => {
      const { defaultValue, deserializer } = config.current;
      if (event.key === key) {
        setStoredValue(
          getItemFromStorage({
            key,
            fallback: defaultValue,
            deserializer,
          })
        );
      }
    };

    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  }, [key]);

  return {
    value,
    setValue,
    remove,
    persist,
  };
}
