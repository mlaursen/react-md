"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useSsr } from "../SsrProvider.js";
import { type UseStateSetter } from "../types.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { getStorageSerializers } from "./internalUtils.js";
import { type StorageImplementation, type StorageOptions } from "./types.js";
import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemInStorage,
} from "./utils.js";

/**
 * The `useStorage` hook can be used to read and write from `localStorage`
 * (default) or `sessionStorage`. The default behavior will automatically sync
 * the value across tabs using the `StorageEvent`.
 *
 * @example Simple Example
 * ```tsx
 * import { TextField } from "@react-md/core/form/TextField";
 * import { useStorage } from "@react-md/core/storage/useStorage";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, setValue } = useStorage({
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
 * import { useStorage } from "@react-md/core/storage/useStorage";
 * import { type ReactElement } from "react";
 *
 * interface ExpectedSchema {
 *   label: string;
 *   value: string;
 *   // others
 * }
 *
 * function Example(): ReactElement {
 *   const { value, setValue } = useStorage<ExpectedSchema | null>({
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
 * import { Button } from "@react-md/core/button/Button";
 * import { Checkbox } from "@react-md/core/form/Checkbox";
 * import { Form } from "@react-md/core/form/Form";
 * import { useStorage } from "@react-md/core/storage/useStorage";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, setValue, remove, persist } = useStorage({
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
 * @see {@link https://next.react-md.dev/hooks/use-storage | useStorage Demos}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 * @since 6.0.0
 */
export function useStorage<T>(
  options: StorageOptions<T>
): StorageImplementation<T> {
  const {
    key,
    defaultValue,
    manual,
    storage = globalThis.localStorage,
  } = options;

  const [initialValue] = useState(defaultValue);
  const { serializer, deserializer } = useMemo(
    () =>
      getStorageSerializers({
        raw: options.raw,
        serializer: options.serializer,
        deserializer: options.deserializer,
        initialValue,
      }),
    [initialValue, options.deserializer, options.raw, options.serializer]
  );

  const ssr = useSsr();
  const [value, setStoredValue] = useState<T>(() => {
    if (ssr) {
      return initialValue;
    }

    return getItemFromStorage({
      key,
      storage,
      fallback: initialValue,
      deserializer,
    });
  });

  const config = useRef({
    key,
    value,
    manual,
    storage,
    serializer,
    deserializer,
    defaultValue: initialValue,
  } as const);
  useIsomorphicLayoutEffect(() => {
    config.current = {
      key,
      value,
      manual,
      storage,
      serializer,
      deserializer,
      defaultValue: initialValue,
    };
  });

  const setValue = useCallback<UseStateSetter<T>>((valueOrDispatcher) => {
    const { key, manual, storage, serializer } = config.current;

    setStoredValue((prevValue) => {
      const nextValue =
        valueOrDispatcher instanceof Function
          ? valueOrDispatcher(prevValue)
          : valueOrDispatcher;

      if (!manual && nextValue !== prevValue) {
        setItemInStorage({
          key,
          value: nextValue,
          storage,
          serializer,
        });
      }

      return nextValue;
    });
  }, []);

  const remove = useCallback(() => {
    removeItemFromStorage(config.current);
  }, []);

  const persist = useCallback(() => {
    setItemInStorage(config.current);
  }, []);

  // make sure to sync the value in local storage
  useEffect(() => {
    const { value, manual, storage, serializer } = config.current;
    if (ssr || !key || !value || manual || !storage) {
      return;
    }

    setItemInStorage({
      key,
      value,
      storage,
      serializer,
    });
  }, [key, ssr]);
  useEffect(() => {
    const { defaultValue, storage, deserializer, manual } = config.current;
    if (manual || !ssr) {
      return;
    }

    // do not want to trigger the emit behavior for rehydration
    setStoredValue(
      getItemFromStorage({
        key,
        storage,
        fallback: defaultValue,
        deserializer,
      })
    );
  }, [key, ssr]);

  // update the value if another tab changed the local storage value
  useEffect(() => {
    if (!key) {
      return;
    }

    const callback = (event: StorageEvent): void => {
      const { storage, defaultValue, deserializer } = config.current;
      if (event.key === key && event.storageArea === storage) {
        setStoredValue(
          getItemFromStorage({
            key,
            storage,
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
