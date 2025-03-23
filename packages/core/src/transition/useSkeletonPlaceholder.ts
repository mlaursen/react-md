"use client";

import { cnb } from "cnbuilder";
import { type CSSProperties, useEffect, useState } from "react";

import { useSsr } from "../SsrProvider.js";
import {
  type SkeletonPlaceholderRandomOptions,
  randomSkeletonPlaceholder,
  skeletonPlaceholder,
} from "./skeletonPlaceholderUtils.js";

/** @since 6.0.0 */
export interface SkeletonPlaceholderOptions
  extends SkeletonPlaceholderRandomOptions {
  style?: CSSProperties;
  className?: string;

  /**
   * Set this to a custom `animation-delay` value (should be in milliseconds).
   *
   * @example
   * ```ts
   * delay="200ms"
   * ```
   */
  delay?: string;

  /**
   * Set this value to a number or length unit string to set the height with
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
   * @example No Inline Width CSS
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
   * @example No Inline Width
   * ```ts
   * import type { ReactElement } from "@react";
   * import { useSkeletonPlaceholder } from "@react-md/core/transition/useSkeletonPlaceholder";
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
   * @example Custom Inline Width
   * ```ts
   * import type { ReactElement } from "@react";
   * import { useSkeletonPlaceholder } from "@react-md/core/transition/useSkeletonPlaceholder";
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
   * @example Pre-rendered Layout
   * ```tsx
   * import type { ReactElement } from "@react";
   * import { SkeletonPlaceholder } from "@react-md/core/transition/useSkeletonPlaceholder";
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

/**
 * @since 6.0.0
 */
export interface SkeletonPlaceholderStylingProps {
  style?: CSSProperties;
  className: string;
}

/**
 * @example Simple Example
 * ```tsx
 * import { useSkeletonPlaceholder } from "@react-md/core/transition/useSkeletonPlaceholder";
 * import { type ReactElement } from "react";
 *
 * export default function UsingTheHookExample(): ReactElement {
 *   const { style, className } = useSkeletonPlaceholder();
 *   return <div style={style} className={className} />;
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/hooks/use-skeleton-placeholder-transition|useSkeletonPlaceholder Demos}
 * @see {@link https://next.react-md.dev/components/skeleton-placeholder|SkeletonPlaceholder Demos}
 * @since 6.0.0
 */
export function useSkeletonPlaceholder(
  options: SkeletonPlaceholderOptions = {}
): SkeletonPlaceholderStylingProps {
  const {
    style: propStyle,
    className,
    height,
    width: propWidth,
    disabled = false,
    delay: propDelay,
    minDelay,
    maxDelay,
    minPercentage,
    maxPercentage,
  } = options;
  const ssr = useSsr();

  const isDefinedWidth = typeof propWidth !== "undefined";
  const isDefinedDelay = typeof propDelay !== "undefined";
  const [randomStyles, setRandomStyles] = useState<CSSProperties>(() => {
    if (typeof window === "undefined" || ssr || disabled) {
      return {};
    }

    return randomSkeletonPlaceholder({
      minDelay,
      maxDelay,
      minPercentage,
      maxPercentage,
    });
  });

  useEffect(() => {
    if (!ssr || disabled || (isDefinedDelay && isDefinedWidth)) {
      return;
    }

    setRandomStyles(
      randomSkeletonPlaceholder({
        minDelay,
        maxDelay,
        minPercentage,
        maxPercentage,
      })
    );
  }, [
    disabled,
    isDefinedDelay,
    isDefinedWidth,
    maxDelay,
    maxPercentage,
    minDelay,
    minPercentage,
    ssr,
  ]);

  let width = propWidth;
  let animationDelay = propDelay;
  if (!disabled) {
    if (!isDefinedDelay) {
      ({ animationDelay } = randomStyles);
    }
    if (!isDefinedWidth) {
      ({ width } = randomStyles);
    }
  }

  let style: CSSProperties | undefined = propStyle;
  if (!!width || !!animationDelay || typeof height !== "undefined") {
    style = {
      ...style,
      height: height ?? style?.height,
      width: width ?? style?.width,
      // Note: not including MozAnimationDelay and WebkitAnimationDelay since
      // they weren't applied when they were set. Probably no longer required?
      animationDelay: animationDelay ?? style?.animationDelay,
    };
  }

  return {
    style,
    className: cnb(className, !disabled && skeletonPlaceholder()),
  };
}
