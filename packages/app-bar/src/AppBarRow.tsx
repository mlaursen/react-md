import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IAppBarRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Boolean if each row is using the "dense" spec for an app bar.
   *
   * @docgen
   */
  dense?: boolean;
}

export interface IAppBarRowDefaultProps {
  dense: boolean;
}

export type AppBarRowWithDefaultProps = IAppBarRowProps & IAppBarRowDefaultProps;

/**
 * The `AppBarRow` is used to help generate a "prominent" AppBar with different rows with correct
 * spacing and alignment. It really just helps enforce the vertical alignment of each item within
 * a row. This should not be used if you want to have a dynamic `AppBar` height.
 */
const AppBarRow: React.SFC<IAppBarRowProps> = ({ dense, className, children, ...props }) => (
  <div
    className={cn(
      "rmd-app-bar__row",
      {
        "rmd-app-bar__row--dense": dense,
      },
      className
    )}
    {...props}
  >
    {children}
  </div>
);

AppBarRow.propTypes = {
  dense: PropTypes.bool,
};

AppBarRow.defaultProps = {
  dense: false,
} as IAppBarRowDefaultProps;

export default AppBarRow;
