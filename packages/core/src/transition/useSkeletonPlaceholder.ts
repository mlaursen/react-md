"use client";
import { cnb } from "cnbuilder";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import { useSsr } from "../SsrProvider";
import { bem, randomInt } from "../utils";

export const skeletonPlaceholder = bem("rmd-skeleton-placeholder");

/** @remarks \@since 6.0.0 */
export interface SkeletonPlaceholderOptions {
  style?: CSSProperties;
  className?: string;

  /** @defaultValue `40` */
  minPercentage?: number;

  /** @defaultValue `85` */
  maxPercentage?: number;

  /**
   * Set this value tp a number or length unit string to set the height with
   * inline styles.
   *
   * If this is `undefined`, it will use the skeleton placeholder CSS variable
   * value instead which defaults to `1.125em`
   *
   * @defaultValue `undefined`
   */
  height?: string | number;

  /**
   * A custom width to apply to the skeleton placeholder.
   *
   * Set this value to an empty string if you want to control the width through
   * SCSS.
   *
   * @example
   * No Inline Width CSS
   * ```scss
   * @use "@react-md/core";
   *
   * .customStyles {
   *   // You could use these mixins on a parent element instead which would
   *   // set the height and width to all skeleton placeholders that appear as a
   *   // child instead
   *   // @include core.transition-set-var(skeleton-placeholder-height, 1.5rem);
   *   // @include core.transition-set-var(skeleton-placeholder-width, 40%);
   *
   *   height: 1,5rem;
   *   width: 40%;
   * }
   * ```
   *
   * @example
   * No Inline Width
   * ```ts
   * import type { ReactElement } from "@react";
   * import { useSkeletonPlaceholder } from "@react-md/core";
   *
   * import styles from "./MyComponent.module.scss";
   *
   * export function Example(): ReactElement {
   *   const skeletonProps = useSkeletonPlaceholder({
   *     width: null,
   *     className: styles.customStyles,
   *   });
   *
   *   return <div {...skeletonProps} />;
   * }
   * ```
   *
   *
   * Set this value to a number or length unit string to set the width with
   * inline styles.
   *
   * @example
   * Custom Inline Width
   * ```ts
   * import type { ReactElement } from "@react";
   * import { useSkeletonPlaceholder } from "@react-md/core";
   *
   * export function Example(): ReactElement {
   *   const skeletonProps = useSkeletonPlaceholder({
   *     // any of these are valid
   *     // width: 40,
   *     // width: "1rem",
   *     // width: "1vh",
   *     // width: "40%",
   *     width: "1rem",
   *   });
   *
   *   return <div {...skeletonProps} />;
   * }
   * ```
   *
   * If this value is `undefined`, a random percentage will be generated instead
   * using the {@link minPercentage} and {@link maxPercentage} options.
   *
   * Set this value to `null` if the size should be derived from the provided
   * `className` instead.
   *
   * @defaultValue `randomInt({ min: minPercentage, max: maxPercentage })%`
   */
  width?: number | string | null;

  /**
   * Settings this to `true` will prevent any of the skeleton placeholder styles
   * to be applied. This is really only useful if you can prerender parts of
   * your layout while waiting for the data to load.
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
   *     <Box grid gridClassName="custom-class-name">
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
   * @defaultValue `false`
   */
  disabled?: boolean;
}

export interface SkeletonPlaceholderStylingProps {
  style?: CSSProperties;
  className: string;
}

export function useSkeletonPlaceholder(
  options: SkeletonPlaceholderOptions = {}
): SkeletonPlaceholderStylingProps {
  const {
    style: propStyle,
    className,
    height,
    width: propWidth,
    disabled = false,
    minPercentage = 40,
    maxPercentage = 85,
  } = options;
  const ssr = useSsr();

  const [randomPercentage, setRandomPercentage] = useState<string | undefined>(
    () => {
      if (
        typeof window === "undefined" ||
        ssr ||
        typeof propWidth !== "undefined"
      ) {
        return;
      }

      return `${randomInt({ min: minPercentage, max: maxPercentage })}%`;
    }
  );

  useEffect(() => {
    if (!ssr || disabled || typeof propWidth !== "undefined") {
      return;
    }

    setRandomPercentage(
      `${randomInt({ min: minPercentage, max: maxPercentage })}%`
    );
  }, [disabled, maxPercentage, minPercentage, propWidth, ssr]);

  const width = useMemo(() => {
    if (disabled || typeof propWidth !== "undefined") {
      return propWidth;
    }

    if (ssr) {
      return randomPercentage;
    }

    return `${randomInt({ min: minPercentage, max: maxPercentage })}%`;
  }, [
    disabled,
    maxPercentage,
    minPercentage,
    propWidth,
    randomPercentage,
    ssr,
  ]);

  let style: CSSProperties | undefined = propStyle;
  if (
    (typeof width !== "undefined" && width !== "") ||
    typeof height !== "undefined"
  ) {
    style = {
      ...style,
      height: height ?? style?.height,
      width: width ?? style?.width,
    };
  }

  return {
    style,
    className: cnb(className, !disabled && skeletonPlaceholder()),
  };
}
