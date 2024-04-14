import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import { type TextOverflow } from "../cssUtils.js";
import { Typography, type TypographyProps } from "../typography/Typography.js";
import { type TypographyType } from "../typography/typographyStyles.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-app-bar-title");

/**
 * - `"small"` - the first character in the title will be `1rem` (`$keyline`)
 *   from the edge of the app bar horizontally
 * - `"nav"` - this should be set when there is a nav button before the title so
 *   that the first character in the title will be `4.5rem` (`title-keyline`)
 * - `"list"` - this should be used when the title should align with the list
 *   item keyline and there is no nav icon before.
 *
 * @since 6.0.0
 */
export type AppBarTitleKeyline = "small" | "nav" | "list";

/** @since 6.0.0 */
export interface AppBarTitleClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"small"`
   * @see {@link AppBarTitleKeyline}
   */
  keyline?: AppBarTitleKeyline;
}

/**
 * Apply the `className`s for a `AppBarTitle` component. This will be type-safe
 * if using typescript.
 *
 * @since 6.0.0
 */
export function appBarTitle(options: AppBarTitleClassNameOptions = {}): string {
  const { className, keyline = "small" } = options;
  return cnb(
    styles({
      keyline: keyline == "list",
      "nav-keyline": keyline === "nav",
    }),
    className
  );
}

/**
 * @since 6.0.0 Renamed the `noWrap` prop to `lineWrap` since the
 * `AppBarTitle` does not line wrap by default.
 */
export interface AppBarTitleProps
  extends TypographyProps,
    AppBarTitleClassNameOptions {
  /** @defaultValue `"headline-6"` */
  type?: TypographyType;

  /**
   * @defaultValue `"ellipsis"`
   */
  textOverflow?: TextOverflow;
}

/**
 * **Server Component**
 *
 * @example
 * Updating the Keyline
 * ```tsx
 * import { AppBar, AppBarTitle } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <AppBar>
 *       <AppBarTitle keyline="nav">
 *         Offset as if there was a nav button to the left
 *       </AppBarTitle>
 *     </AppBar>
 *   );
 * }
 * ```
 *
 * @since 6.0.0 Renamed the `noWrap` prop to `lineWrap` since the `AppBarTitle`
 * does not line wrap by default.
 * @since 6.0.0 The `keyline` prop was changed from a boolean to a type
 * union of different keylines: {@link AppBarTitleKeyline}
 */
export const AppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  function AppBarTitle(props, ref) {
    const {
      type = "headline-6",
      keyline = "small",
      children,
      className,
      textOverflow = "ellipsis",
      ...remaining
    } = props;
    return (
      <Typography
        {...remaining}
        ref={ref}
        type={type}
        className={appBarTitle({
          keyline,
          className,
        })}
        textOverflow={textOverflow}
      >
        {children}
      </Typography>
    );
  }
);
