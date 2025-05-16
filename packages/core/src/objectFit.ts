import { cnb } from "cnbuilder";

import { bem } from "./utils/bem.js";

const styles = bem("rmd-object-fit");

/**
 * @since 6.0.0
 */
export interface ObjectFitOptions {
  className?: string;

  /**
   * Set this to `true` if the image should only shrink and grow relative to the
   * container, but not extend past it's native width. So let's say there is an
   * image set to 1920x1080:
   *
   * - container is 4096x2160
   *   - inline:
   *     - false - image grows to 4096x2160
   *     - true  - image is 1920x1080
   * - container is 360x800
   *   - inline:
   *     - false - image shrinks to 360×203
   *     - true  - image shrinks to 360×203
   *
   * @defaultValue `false`
   */
  inline?: boolean;

  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit}
   * @defaultValue `aspectRatio ? "fill" : "contain"`
   */
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /**
   * Set this to a custom aspect ratio to use.
   *
   * @example Valid Aspect Ratios
   * ```tsx
   * aspectRatio: "16-9",
   * aspectRatio: "9-16",
   * aspectRatio: "3-4",
   * aspectRatio: "4-3",
   * aspectRatio: "1-1",
   * ```
   *
   * These values are based on the `$object-fit-aspect-ratios` map.
   *
   * @defaultValue `""`
   */
  aspectRatio?: `${number}-${number}`;
}

/**
 * This is a utility className helper function that should be applied to
 * `<img>` and `<video>` elements to make them responsive to their content box
 * container.
 *
 * @example Simple Example
 * ```tsx
 * import { objectFit } from "@react-md/core/objectFit";
 *
 * export function Example() {
 *   return (
 *     <img
 *       alt=""
 *       src="https://example.com/example.png"
 *       className={objectFit()}
 *     />
 *   );
 * }
 * ```
 *
 * @example Setting Aspect Ratio
 * ```tsx
 * import { objectFit } from "@react-md/core/objectFit";
 *
 * export function Example() {
 *   return (
 *     <img
 *       alt=""
 *       src="https://example.com/example.png"
 *       className={objectFit({
 *         aspectRatio: "16-9",
 *       })}
 *     />
 *   );
 * }
 *
 * ```
 *
 * @since 6.0.0
 */
export function objectFit(options: ObjectFitOptions = {}): string {
  const { className, inline, fit: propFit, aspectRatio = "" } = options;
  const fit = propFit ?? (aspectRatio ? "fill" : "contain");

  return cnb(
    styles({
      [fit]: fit !== "contain",
      contain: !inline,
      [aspectRatio]: !!aspectRatio,
    }),
    className
  );
}
