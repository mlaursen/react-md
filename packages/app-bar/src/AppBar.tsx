import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type AppBarPosition = "top" | "bottom";
export type AppBarTheme = "clear" | "primary" | "secondary" | "default";

/**
 * The `AppBar` component is normally used to create a fixed header element within your page that defines a title,
 * optional actions, and an optional navigation button.
 */
export interface IAppBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if the `AppBar` should be fixed to the top or bottom of the page.
   *
   * @docgen
   */
  fixed?: boolean;

  /**
   * The position within the page to "fix" the `AppBar` when the `fixed` prop is enabled.
   *
   * @docgen
   */
  fixedPosition?: AppBarPosition;

  /**
   * Boolean if the fixed `AppBar` should gain elevation. This is recommended to stay enabled unless
   * you manually apply a border to help separate the `AppBar` from other content.
   *
   * @docgen
   */
  fixedElevation?: boolean;

  /**
   * Boolean if the `AppBar` should use the `dense` spec. This prop can be used along with the `prominent` prop
   * to create a prominent and dense `AppBar`.
   *
   * @docgen
   */
  dense?: boolean;

  /**
   * Boolean if the `AppBar` should use the `prominent` spec. This prop can be used along with the `dense` prop
   * to create a prominent and dense `AppBar`.
   *
   * @docgen
   */
  prominent?: boolean;

  /**
   * The theme to apply to the `AppBar`.
   *
   * @docgen
   */
  theme?: AppBarTheme;

  /**
   * Boolean if the `AppBarNav`, `AppBarTitle`, and `AppBarActions` should inherit the color that for the provided
   * `theme`. If this value is `undefined`, the color will only be inherited when the theme is set to `primary` or
   * `secondary`. However if this value is a boolean, it will be used instead. So if you set this to `false` and set
   * the `theme` to `"primary"`, the defined primary text clor will not be inherited.
   *
   * @docgen
   */
  inheritColor?: boolean;
}

export interface IAppBarDefaultProps {
  fixed: boolean;
  fixedPosition: AppBarPosition;
  fixedElevation: boolean;
  dense: boolean;
  prominent: boolean;
  theme: AppBarTheme;
}

export type AppBarWithDefaultProps = IAppBarProps & IAppBarDefaultProps;

/**
 * The `AppBar` component is usually used to create a fixed header within your page that has a title, an optional nav,
 * and optional actions. Since it is fixed on the page, it normally requires adding padding or margin to relative
 * elements so that they aren't covered by this component. You can use the static class names on the
 * `AppBar` to correctly add the padding or margin.
 *
 * ```tsx
 * AppBar.offsetClassName
 * AppBar.offsetProminentClassName
 * AppBar.offsetDenseClassName
 * AppBar.offsetProminentDenseClassName
 * ```
 *
 * You can also use the provided `rmd-app-bar-offset` mixin to manually apply the offset to one element.
 */
export default class AppBar extends React.Component<IAppBarProps> {
  public static offsetClassName = "rmd-app-bar-offset";
  public static offsetProminentClassName = "rmd-app-bar-offset--prominent";
  public static offsetDenseClassName = "rmd-app-bar-offset--dense";
  public static offsetProminentDenseClassName = "rmd-app-bar-offset--prominent-dense";

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

    const inherit = typeof inheritColor === "boolean" ? inheritColor : theme !== "clear" && theme !== "default";
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
