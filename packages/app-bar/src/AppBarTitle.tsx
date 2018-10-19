import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IAppBarTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Boolean if the title should be placed at the `$rmd-app-bar-title-keyline`.
   *
   * @docgen
   */
  keyline?: boolean;
}

export interface IAppBarTitleDefaultProps {
  keyline: boolean;
}

export type AppBarTitleWithDefaultProps = IAppBarTitleProps & IAppBarTitleDefaultProps;

/**
 * The `AppBarTitle` component is a simple wrapper around an `<h6>` tag to get styling for a title
 * within an app bar.
 */
export default class AppBarTitle extends React.Component<IAppBarTitleProps> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    keyline: PropTypes.bool,
  };

  public static defaultProps = {
    keyline: false,
  } as IAppBarTitleDefaultProps;

  public render() {
    const { keyline, className, ...props } = this.props;
    return (
      <h6
        {...props}
        className={cn(
          "rmd-app-bar__title",
          {
            "rmd-app-bar__title--keyline": keyline,
          },
          className
        )}
      />
    );
  }
}
