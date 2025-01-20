"use client";

import { useCallback, useState } from "react";

import { type UseStateInitializer, type UseStateSetter } from "./types.js";

/**
 * @since 6.0.0
 */
export interface ToggleImplementation {
  toggled: boolean;
  setToggled: UseStateSetter<boolean>;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

/**
 *
 * @example Simple Example
 * ```tsx
 * import { Button, useToggle } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { toggled, toggle } = useToggle();
 *
 *   return (
 *     <>
 *       <Button onClick={toggle}>Toggle</Button>
 *       {`Toggled: ${toggled}`}
 *     </>
 *   );
 * }
 * ```
 *
 * @param defaultValue - `false`
 */
export function useToggle(
  defaultValue: UseStateInitializer<boolean> = false
): ToggleImplementation {
  const [toggled, setToggled] = useState(defaultValue);

  return {
    toggled,
    setToggled,
    toggle: useCallback(() => {
      setToggled((prevToggled) => !prevToggled);
    }, []),
    enable: useCallback(() => {
      setToggled(true);
    }, []),
    disable: useCallback(() => {
      setToggled(false);
    }, []),
  };
}
