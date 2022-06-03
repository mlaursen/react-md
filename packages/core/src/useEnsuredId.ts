/* eslint-disable react-hooks/rules-of-hooks */
import { useId, useMemo } from "react";

let i = 0;

/**
 * This hook is used to ensure that an `id` has been provided to a component
 * either through props or use the `useId` hook.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { HTMLAttributes, ReactElement } from "react";
 * import { useEnsuredId } from "@react-md/core";
 *
 * export function MaterialDesignComponent(props: HTMLAttributes<HTMLDivElement>): ReactElement {
 *   const id = useEnsuredId(props.id, "component-name");
 *
 *   return <div {...props} id={id} />;
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 * @internal
 */
export function useEnsuredId(
  propId: string | undefined,
  prefix: string
): string {
  let id: string;
  if (process.env.NODE_ENV === "test") {
    id = useMemo(() => `ensured-id-${i++}`, []);
  } else {
    id = useId();
  }

  return propId ?? `${prefix}-${id}`;
}
