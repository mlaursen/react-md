import { ReactNode } from "react";

/**
 * A small util to check if the badge is considered empty.
 *
 * @internal
 */
export function isEmpty(
  children: ReactNode,
  disableNullOnZero: boolean
): boolean {
  return (
    !disableNullOnZero &&
    (children === 0 || children === "0" || children === null)
  );
}
