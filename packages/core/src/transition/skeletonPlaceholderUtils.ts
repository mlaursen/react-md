import { type CSSProperties } from "react";
import { bem } from "../utils/bem.js";
import { randomInt } from "../utils/randomInt.js";

/**
 * @since 6.0.0
 */
export const skeletonPlaceholder = bem("rmd-skeleton-placeholder");

/**
 * @since 6.0.0
 */
export interface SkeletonPlaceholderRandomOptions {
  /**
   * The minimum `animation-delay` milliseconds allowed in the random generator.
   * This value should be: `0 <= minDelay < maxDelay`.
   *
   * The `animation-delay` will be generated by:
   * ```ts
   * const delay = randomInt({
   *   min: minDelay,
   *   max: maxDelay,
   * });
   *
   * return {
   *   animationDelay: `-${delay}ms`,
   * };
   * ```
   *
   * @defaultValue `0`
   */
  minDelay?: number;

  /**
   * @see {@link minDelay}
   * @defaultValue `400`
   */
  maxDelay?: number;

  /**
   * The minimum width percentage allowed in the random generator. This value
   * should be: `0 >= minPercentage < maxPercentage`.
   *
   * The `width` will be generated by:
   * ```ts
   * const width = randomInt({
   *   min: minPercentage,
   *   max: maxPercentage,
   * });
   *
   * return {
   *   width: `${width}%`,
   * };
   * ```
   * @defaultValue `40`
   */
  minPercentage?: number;

  /**
   * @see {@link minPercentage}
   * @defaultValue `85`
   */
  maxPercentage?: number;
}

/**
 * A server-only safe util to generate a random skeleton placeholder.
 *
 * @example
 * ```tsx
 * import { skeletonPlaceholder, randomSkeletonPlaceholder } from "@react-md/core";
 * import "server-only";
 *
 * export function RandomSkeletonPlaceholder(): ReactElement {
 *   return
 *     <div
 *       style={randomSkeletonPlaceholder()}
 *       className={skeletonPlaceholder()}
 *     />
 *   );
 * }
 * ```
 * @since 6.0.0
 */
export function randomSkeletonPlaceholder(
  options: SkeletonPlaceholderRandomOptions = {}
): CSSProperties {
  const {
    minDelay = 0,
    maxDelay = 400,
    minPercentage = 40,
    maxPercentage = 85,
  } = options;

  return {
    animationDelay: `-${randomInt({
      min: minDelay,
      max: maxDelay,
    })}ms`,
    width: `${randomInt({
      min: minPercentage,
      max: maxPercentage,
    })}%`,
  };
}
