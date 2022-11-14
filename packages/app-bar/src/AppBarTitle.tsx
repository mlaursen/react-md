import { bem, Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const styles = bem("rmd-app-bar-title");

/**
 * - `"small"` - the first character in the title will be `1rem` (`$keyline`)
 *   from the edge of the app bar horizontally
 * - `"nav"` - this should be set when there is a nav button before the title so
 *   that the first character in the title will be `4.5rem` (`title-keyline`)
 * - `"title"` - this should be used when the title should align with the list
 *   item keyline and there is no nav icon before.
 *
 * @remarks \@since 6.0.0
 */
export type AppBarTitleKeyline = "small" | "nav" | "title";

/** @remarks \@since 6.0.0 */
export interface AppBarTitleClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"small"`
   * @see {@link AppBarTitleKeyline}
   */
  keyline?: AppBarTitleKeyline;

  /**
   * Set this to `true` if the children should be allowed to line wrap.
   *
   * @defaultValue `false`
   */
  disableNoWrap?: boolean;
}

/**
 * Apply the `className`s for a `AppBarTitle` component. This will be type-safe
 * if using typescript.
 *
 * @remarks \@since 6.0.0
 */
export function appBarTitle(options: AppBarTitleClassNameOptions = {}): string {
  const { className, keyline = "small", disableNoWrap = false } = options;
  return cnb(
    styles({
      keyline: keyline == "title",
      "no-wrap": !disableNoWrap,
      "nav-keyline": keyline === "nav",
    }),
    className
  );
}

export interface AppBarTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    AppBarTitleClassNameOptions {}

export const AppBarTitle = forwardRef<HTMLHeadingElement, AppBarTitleProps>(
  function AppBarTitle(props, ref) {
    const {
      disableNoWrap = false,
      keyline = "small",
      children,
      className,
      ...remaining
    } = props;
    return (
      <Typography
        ref={ref}
        {...remaining}
        type="headline-6"
        className={appBarTitle({
          keyline,
          className,
          disableNoWrap,
        })}
      >
        {children}
      </Typography>
    );
  }
);
