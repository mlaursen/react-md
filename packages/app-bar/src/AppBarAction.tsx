import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IAppBarActionProps extends IButtonProps {
  /**
   *
   * @docgen
   */
  first?: boolean;

  last?: boolean;
}

export interface IAppBarActionDefaultProps extends IButtonDefaultProps {
  first: boolean;
  last: boolean;
}

export type AppBarActionWithDefaultProps = IAppBarActionProps & IAppBarActionDefaultProps;

const AppBarAction: React.SFC<IAppBarActionProps> = ({ className, first, last, ...props }) => {
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
};

AppBarAction.propTypes = {
  first: PropTypes.bool,
  last: PropTypes.bool
};

AppBarAction.defaultProps = {
  asDiv: false,
  disabled: false,
  theme: "clear",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
  first: false,
  last: false,
} as IAppBarActionDefaultProps;

export default AppBarAction;
