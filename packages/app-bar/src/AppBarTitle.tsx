import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IAppBarTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  [key: string]: any;
  dense?: boolean;
  offset?: boolean;
  prominent?: boolean;
}

export interface IAppBarTitleDefaultProps {
  dense: boolean;
  offset: boolean;
  prominent: boolean;
}

export type AppBarTitleWithDefaultProps = IAppBarTitleProps & IAppBarTitleDefaultProps;

const AppBarTitle: React.SFC<IAppBarTitleProps> = ({ dense, offset, prominent, className, ...props }) => (
  <h6
    {...props}
    className={cn(
      "rmd-app-bar__title",
      {
        "rmd-app-bar__title--offset": offset,
        "rmd-app-bar__title--prominent": prominent && !dense,
        "rmd-app-bar__title--prominent-dense": prominent && dense,
      },
      className
    )}
  />
);

AppBarTitle.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  offset: PropTypes.bool,
};

AppBarTitle.defaultProps = {
  dense: false,
  offset: false,
  prominent: false,
} as IAppBarTitleDefaultProps;

export default AppBarTitle;
