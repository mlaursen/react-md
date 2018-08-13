import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Text } from "@react-md/typography";

export interface IAppBarTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  disableOffset?: boolean;
  disableNavOffset?: boolean;
}

export interface IAppBarTitleDefaultProps {
  disableOffset: boolean;
  disableNavOffset: boolean;
}

export type AppBarTitleWithDefaultProps = IAppBarTitleProps & IAppBarTitleDefaultProps;

const AppBarTitle: React.SFC<IAppBarTitleProps> = ({ disableOffset, disableNavOffset, className, ...props }) => (
  <Text
    className={cn(
      "rmd-app-bar__title",
      {
        "rmd-app-bar__title--offset": !disableOffset,
        "rmd-app-bar__title--nav-offset": !disableOffset && !disableNavOffset,
      },
      className
    )}
  />
);

AppBarTitle.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  disableOffset: PropTypes.bool,
  disableNavOffset: PropTypes.bool,
};

AppBarTitle.defaultProps = {
  disableOffset: false,
  disableNavOffset: false,
} as IAppBarTitleDefaultProps;

export default AppBarTitle;
