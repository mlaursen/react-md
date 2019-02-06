import React, { FunctionComponent } from "react";
import cn from "classnames";
import {
  MenuItem as WIAMenuItem,
  IMenuItemProps,
  useIsKeyboardFocused,
} from "@react-md/wia-aria";

const MenuItem: FunctionComponent<IMenuItemProps> = ({
  className,
  ...props
}) => {
  return (
    <WIAMenuItem
      {...props}
      className={cn(
        "menu-item",
        {
          "rmd-states--focused": useIsKeyboardFocused(props.id),
        },
        className
      )}
    />
  );
};

export default MenuItem;
