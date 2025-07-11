"use client";

import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  forwardRef,
} from "react";

import {
  type SkeletonPlaceholderOptions,
  useSkeletonPlaceholder,
} from "./useSkeletonPlaceholder.js";

/** @since 6.0.0 */
export interface SkeletonPlaceholderProps
  extends HTMLAttributes<HTMLDivElement>,
    SkeletonPlaceholderOptions {
  /**
   * @defaultValue `!!children`
   * @see {@link SkeletonPlaceholderOptions.disabled}
   */
  disabled?: boolean;

  /** @see {@link SkeletonPlaceholderOptions.disabled} for an example */
  children?: ReactNode;
}

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import type { ReactElement } from "@react";
 * import { SkeletonPlaceholder } from "@react-md/core/transition/SkeletonPlaceholder";
 *
 * interface ExampleProps {
 *   loading: boolean;
 *   children: ReactNode;
 * }
 *
 * export default function Example({ loading, children }: ExampleProps): ReactElement {
 *   if (loading) {
 *     return <SkeletonPlaceholder />;
 *   }
 *
 *   return <>{children}</>;
 * }
 * ```
 *
 * @example Pre-rendered Layout
 * ```tsx
 * import type { ReactElement } from "@react";
 * import { SkeletonPlaceholder } from "@react-md/core/transition/SkeletonPlaceholder";
 *
 * interface Data {
 *   id: string;
 *   name: string;
 *   createdBy: string
 *   createdOn: string;
 *   modifiedBy: string;
 *   modifiedOn: string;
 * }
 *
 * function ShowData({
 *   id,
 *   name,
 *   createdBy,
 *   createdOn,
 *   modifiedBy,
 *   modifiedOn,
 * }: Partial<Data>:: ReactElement {
 *   const loading =
 *     !name &&
 *     !createdBy &&
 *     !createdOn &&
 *     !modifiedBy &&
 *     !modifiedOn;
 *
 *   return (
 *     <Box grid gridName="custom-class-name">
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {id}
 *       </SkeletonPlaceholder>
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {name}
 *       </SkeletonPlaceholder>
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {createdOn}
 *       </SkeletonPlaceholder>
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {createdBy}
 *       </SkeletonPlaceholder>
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {modifiedOn}
 *       </SkeletonPlaceholder>
 *       <SkeletonPlaceholder disabled={!loading}>
 *         {modifiedBy}
 *       </SkeletonPlaceholder>
 *     </Box>
 *   );
 * }
 *
 * export function Example(): ReactElement {
 *   const { data } = useLoadSomeDataQuery();
 *
 *   const items = useMemo(() => {
 *     // if the data has been fetched, just return the data
 *     if (data) {
 *       return data;
 *     }
 *
 *     // if the data does not exist, set up a skeleton of your layout by
 *     // rendering a random number of items.
 *     //
 *     // NOTE: This is memoized so you don't create a random length each
 *     // render
 *     const length = randomInt({ min: 3, max: 10 })
 *     return Array.from({ length }, (_, i) => ({ id: `placeholder-${i}` }));
 *   }, [data])
 *
 *   return (
 *     <List>
 *       {items.map((item) => <ShowData {...item} />)}
 *     </List>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/skeleton-placeholder | SkeletonPlaceholder Demos}
 * @since 6.0.0
 */
export const SkeletonPlaceholder = forwardRef<
  HTMLDivElement,
  SkeletonPlaceholderProps
>(function SkeletonPlaceholder(props, ref): ReactElement {
  const {
    style,
    className,
    height,
    width,
    children,
    disabled = !!children,
    delay,
    minDelay,
    maxDelay,
    minPercentage,
    maxPercentage,
    ...remaining
  } = props;
  const skeleton = useSkeletonPlaceholder({
    disabled,
    style,
    className,
    height,
    width,
    delay,
    minDelay,
    maxDelay,
    minPercentage,
    maxPercentage,
  });

  return (
    <div {...remaining} ref={ref} {...skeleton}>
      {children}
    </div>
  );
});
