import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { Button, IButtonProps, IButtonDefaultProps } from "@react-md/button";

export interface IActionButtonProps extends IButtonProps {
  /**
   *
   * @docgen
   */
  float?: boolean;
}

export interface IActionButtonDefaultProps extends IButtonDefaultProps {
  float: boolean;
}

export type ActionButtonWithDefaultProps = IActionButtonProps & IActionButtonDefaultProps;

const ActionButton: React.SFC<IActionButtonProps> = ({ className, float, ...props }) => {
  return (
    <Button
      className={cn(
        "rmd-app-bar__action",
        {
          "rmd-app-bar__action--float": float,
        },
        className
      )}
      {...props}
    />
  );
};

ActionButton.propTypes = {
  float: PropTypes.bool,
};

ActionButton.defaultProps = {
  asDiv: false,
  disabled: false,
  theme: "primary",
  themeType: "flat",
  btnType: "icon",
  iconAfter: false,
  float: false,
} as IActionButtonDefaultProps;

export default ActionButton;
