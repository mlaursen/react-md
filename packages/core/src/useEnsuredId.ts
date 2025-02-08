import { useId } from "react";

/**
 * This hook is used to ensure that an `id` has been provided to a component
 * either through props or use the `useId` hook.
 *
 * @example Simple Example
 * ```tsx
 * import type { HTMLAttributes, ReactElement } from "react";
 * import { useEnsuredId } from "@react-md/core/useEnsuredId";
 *
 * export function MaterialDesignComponent(props: HTMLAttributes<HTMLDivElement>): ReactElement {
 *   const id = useEnsuredId(props.id, "component-name");
 *
 *   return <div {...props} id={id} />;
 * }
 * ```
 *
 * @since 6.0.0
 * @internal
 */
export function useEnsuredId(
  propId: string | undefined,
  prefix: string
): string {
  const id = useId();

  return propId ?? `${prefix}-${id}`;
}
