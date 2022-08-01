import { useCallback, useState } from "react";
import type { UseStateInitializer, UseStateSetter } from "./types";

/**
 * @remarks \@since 6.0.0
 */
export interface ToggleHookReturnValue {
  toggled: boolean;
  setToggled: UseStateSetter<boolean>;
  toggle(): void;
  enable(): void;
  disable(): void;
}

/**
 *
 * @example
 * Simple Example
 * ```tsx
 * import { Button } from "@react-md/button";
 * import { useToggle } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { toggled, toggle } = useToggle();
 *
 *   return (
 *     <>
 *       <Button onClick=[toggle]>Toggle</Button>
 *       {`Toggled: ${toggled}`}
 *     </>
 *   );
 * }
 * ```
 */
export function useToggle(
  defaultValue: UseStateInitializer<boolean> = false
): Readonly<ToggleHookReturnValue> {
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
