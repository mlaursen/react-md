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
const AppBarTitle: React.SFC<IAppBarTitleProps> = ({ keyline, className, ...props }) => (
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

AppBarTitle.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  keyline: PropTypes.bool,
};

AppBarTitle.defaultProps = {
  keyline: false,
} as IAppBarTitleDefaultProps;

export default AppBarTitle;
