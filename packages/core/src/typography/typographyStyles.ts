import { cnb } from "cnbuilder";
import { cssUtils, type TextCssUtilsOptions } from "../cssUtils.js";

/**
 * A union of all the material design provided typography styles. When used with
 * the Typography component, this will generate the correct typography className
 * to apply and determine what component to be rendered as if none was provided.
 *
 * @since 4.0.0
 */
export type TypographyType =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2"
  | "caption"
  | "overline";

/** @since 6.0.0 */
export interface TypographyClassNameOptions extends TextCssUtilsOptions {
  className?: string;

  /**
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType;
}

/** @since 6.0.0 */
export type NullableTypographyClassNameOptions = Omit<
  TypographyClassNameOptions,
  "type"
> & {
  /**
   * When using the {@link typography} class name utility, the `type` can be set
   * to `null` to inherit font.
   *
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType | null;
};

/**
 * Get a typography class name based on different typography options. This is
 * only useful if you are unable to use the {@link Typography} component for
 * some reason.
 *
 * @example
 * Simple Example
 * ```ts
 * import { typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1 className={typography({ type: "headline-1" })} />
 *       <h2 className={typography({ type: "headline-2" })} />
 *       <h3 className={typography({ type: "headline-3" })} />
 *       <h4 className={typography({ type: "headline-4" })} />
 *       <h5 className={typography({ type: "headline-5" })} />
 *       <h6 className={typography({ type: "headline-6" })} />
 *       <h5 className={typography({ type: "subtitle-1" })} />
 *       <h6 className={typography({ type: "subtitle-2" })} />
 *       <p className={typography()} />
 *       <p className={typography({ type "body-1" })} />
 *       <p className={typography({ type "body-1" })} />
 *       <caption className={typography({ type: "caption" })} />
 *       <span className={typography({ type: "overline" })} />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Applying Additional Styles
 * ```ts
 * import { typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1
 *         // only maintain the default margin-bottom
 *         className={typography({
 *           type: "headline-1",
 *           margin: "bottom",
 *         })}
 *        />
 *
 *       <h2
 *         // remove all default margin
 *         className={typography({
 *           type: "headline-2",
 *           margin: "none",
 *         })}
 *       />
 *
 *       <h3
 *         // only maintain the default margin-top
 *         className={typography({
 *           type: "headline-3",
 *           margin: "top",
 *         })}
 *       />
 *
 *       <p
 *         // center the text, set to bold, and only maintain default margin-bottom
 *         className={typography({
 *           type "subtitle-1",
 *           align: "center",
 *           margin: "bottom",
 *         })}
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link Typography}
 * @param options - An optional object of options used to create the typography
 * class name.
 * @returns a typography class name string
 * @since 6.0.0
 */
export function typography(
  options: NullableTypographyClassNameOptions = {}
): string {
  const { type = "body-1" } = options;

  // using `&&` instead of `bem` since the latest version of typescript does not
  // support setting the same object key (empty string)
  return cnb(
    "rmd-typography",
    type && `rmd-typography--${type}`,
    cssUtils(options)
  );
}
