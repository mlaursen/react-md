import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import type { SkeletonPlaceholderOptions } from "./useSkeletonPlaceholder";
import { useSkeletonPlaceholder } from "./useSkeletonPlaceholder";

/** @remarks \@since 6.0.0 */
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
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "@react";
 * import { SkeletonPlaceholder } from "@react-md/core";
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
 * @example
 * Pre-rendered Layout
 * ```tsx
 * import type { ReactElement } from "@react";
 * import { SkeletonPlaceholder } from "@react-md/core";
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
 * @remarks \@since 6.0.0
 */
export function SkeletonPlaceholder(
  props: SkeletonPlaceholderProps
): ReactElement {
  const {
    style,
    className,
    height,
    width,
    children,
    disabled = !!children,
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
    minPercentage,
    maxPercentage,
  });

  return (
    <div {...remaining} {...skeleton}>
      {children}
    </div>
  );
}
