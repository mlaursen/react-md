import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

/**
 * The props that are used by the AppBar component. You can import these props to help
 * create a wrapper component with additional functionality.
 *
 * Example:
 *
 * ```tsx
 * import * as React from "react";
 * import { IAppBarProps, AppBar } from "@react-md/app-bar"
 *
 * const MyCustomAppBar: React.SFC<IAppBarProps> = ({ className, children, ...props }) => (
 *  <AppBar {...props} className={cn("my-custom-app-bar", className)}>
 *    <img src="/company-logo" alt="Company logo" />
 *    {children}
 *  </AppBar>
 * )
 * ```
 */
export interface IAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the `AppBar` should be fixed to the top or bottom of the page.
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is enabled.
   */
  fixedPosition?: AppBarPosition;

  /**
   * Boolean if the fixed `AppBar` should gain elevation. This is recommended to stay enabled unless
   * you manually apply a border to help separate the `AppBar` from other content.
   */
  fixedElevation?: boolean;

  /**
   * Boolean if the `AppBar` should use the `dense` spec. This prop can be used along with the
   * `prominent` prop to create a prominent and dense `AppBar`.
   */
  dense?: boolean;

  /**
   * Boolean if the `AppBar` should use the `prominent` spec. This prop can be used along with
   * the `dense` prop to create a prominent and dense `AppBar`.
   */
  prominent?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should inherit the color that
   * for the provided `theme`. If this value is `undefined`, the color will only be inherited when
   * the theme is set to `primary` or `secondary`. However if this value is a boolean, it will be
   * used instead. So if you set this to `false` and set the `theme` to `"primary"`, the defined
   * primary text clor will not be inherited.
   */
  inheritColor?: boolean;
}

/**
 * The default props for the AppBar.
 */
export interface IAppBarDefaultProps {
  fixed: boolean;
  fixedPosition: AppBarPosition;
  fixedElevation: boolean;
  dense: boolean;
  prominent: boolean;
  theme: AppBarTheme;
}

/**
 * A simple type that is used to help type-enforce the props of an AppBar after the default props
 * have been applied.
 */
export type AppBarWithDefaultProps = IAppBarProps & IAppBarDefaultProps;

/**
 * The `AppBar` component is usually used to create a fixed header within your page that has a
 * title, an optional nav, and optional actions. Since it is fixed on the page, it normally
 * requires adding padding or margin to relative elements so that they aren't covered by this
 * component. You can use the static class names on the `AppBar` to correctly add the padding
 * or margin.
 * - `AppBar.offsetClassName`
 * - `AppBar.offsetProminentClassName`
 * - `AppBar.offsetDenseClassName`
 * - `AppBar.offsetProminentDenseClassName`
 *
 * You can also use the provided `rmd-app-bar-offset` mixin to manually apply the offset to
 * one element.
 */
export default class AppBar extends React.Component<IAppBarProps> {
  /**
   * The `className` to apply to an element that should be offset for a normal height AppBar.
   *
   * Example:
   * ```tsx
   * <AppBar fixed={true} />
   * <div className={AppBar.offsetClassName}>
   *  This div now has padding-top applied equal the AppBar's height.
   * </div>
   * ```
   */
  public static readonly offsetClassName: string = "rmd-app-bar-offset";

  /**
   * The `className` to apply to an element that should be offset for a prominent height AppBar.
   *
   * Example:
   * ```tsx
   * <AppBar fixed={true} />
   * <div className={AppBar.offsetProminentClassName}>
   *  This div now has padding-top applied equal the AppBar's prominent height.
   * </div>
   * ```
   */
  public static readonly offsetProminentClassName: string = "rmd-app-bar-offset--prominent";

  /**
   * The `className` to apply to an element that should be offset for a dense height AppBar.
   *
   * Example:
   * ```tsx
   * <AppBar fixed={true} />
   * <div className={AppBar.offsetDenseClassName}>
   *  This div now has padding-top applied equal the AppBar's dense height.
   * </div>
   * ```
   */
  public static readonly offsetDenseClassName: string = "rmd-app-bar-offset--dense";

  /**
   * The `className` to apply to an element that should be offset for a prominent dense
   * height AppBar.
   *
   * Example:
   * ```tsx
   * <AppBar fixed={true} />
   * <div className={AppBar.offsetProminentDenseClassName}>
   *  This div now has padding-top applied equal the AppBar's prominent dense height.
   * </div>
   * ```
   */
  public static readonly offsetProminentDenseClassName: string =
    "rmd-app-bar-offset--prominent-dense";

  public static propTypes = {
    dense: PropTypes.bool,
    prominent: PropTypes.bool,
    fixed: PropTypes.bool,
    fixedPosition: PropTypes.oneOf(["top", "bottom"]),
    fixedElevation: PropTypes.bool,
    inheritColor: PropTypes.bool,
    theme: PropTypes.oneOf(["primary", "secondary", "default", "clear"]),
  };

  public static defaultProps: IAppBarDefaultProps = {
    fixed: true,
    fixedPosition: "top",
    fixedElevation: true,
    dense: false,
    prominent: false,
    theme: "primary",
  };

  public render() {
    const {
      className,
      dense,
      prominent,
      children,
      fixed,
      fixedPosition,
      fixedElevation,
      theme,
      inheritColor,
      ...props
    } = this.props as AppBarWithDefaultProps;

    const inherit =
      typeof inheritColor === "boolean" ? inheritColor : theme !== "clear" && theme !== "default";
    return (
      <header
        {...props}
        className={cn(
          `rmd-app-bar rmd-app-bar--${theme}`,
          {
            "rmd-app-bar--child-inherit": inherit,
            "rmd-app-bar--dense": dense && !prominent,
            "rmd-app-bar--prominent": prominent,
            "rmd-app-bar--prominent-dense": dense && prominent,
            "rmd-app-bar--fixed": fixed,
            "rmd-app-bar--fixed-elevation": fixed && fixedElevation,
            [`rmd-app-bar--${fixedPosition}`]: fixed,
          },
          className
        )}
      >
        {children}
      </header>
    );
  }
}
