import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IAppBarActionProps extends IButtonProps {
  /**
   * Boolean if this is the first action within the app bar. This is really just used to automatically
   * right-align all the actions by applying `margin-left: auto` to this action.
   */
  first?: boolean;

  /**
   * Boolean if this is the last action within the app bar's row. This will just apply the `$rmd-app-bar-lr-margin`
   * as `margin-right`.
   *
   * NOTE: This should not be used when using an overflow menu.
   */
  last?: boolean;
}

export interface IAppBarActionDefaultProps extends IButtonDefaultProps {
  first: boolean;
  last: boolean;
}

export type AppBarActionWithDefaultProps = IAppBarActionProps & IAppBarActionDefaultProps;

/**
 * The `AppBarAction` component is a simple wrapper of the `Button` component that just adds some additional
 * styles as needed to position itself within the `AppBar` as well as changing the default props so that it
 * is `"icon"` by default instead of `"text"` and `"clear"` instead of `"primary"` for the theme.
 */
export default class AppBarAction extends React.Component<IAppBarActionProps> {
  public static propTypes = {
    first: PropTypes.bool,
    last: PropTypes.bool,
  };

  public static defaultProps = {
    asDiv: false,
    disabled: false,
    theme: "clear",
    themeType: "flat",
    btnType: "icon",
    iconAfter: false,
    first: false,
    last: false,
  } as IAppBarActionDefaultProps;

  public render() {
    const { className, first, last, ...props } = this.props;

    return (
      <Button
        className={cn(
          "rmd-app-bar__action",
          {
            "rmd-app-bar__action--first": first,
            "rmd-app-bar__action--last": last,
          },
          className
        )}
        {...props}
      />
    );
  }
}
