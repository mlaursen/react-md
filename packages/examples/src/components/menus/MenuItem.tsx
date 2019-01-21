import React, { FunctionComponent } from "react";
import cn from "classnames";
import {
  MenuItem as WIAMenuItem,
  IMenuItemProps,
  useIsKeyboardFocused,
} from "@react-md/wia-aria";

import styles from "./menu.module.scss";

const MenuItem: FunctionComponent<IMenuItemProps> = ({
  className,
  ...props
}) => {
  return (
    <WIAMenuItem
      {...props}
      className={cn(
        styles.menuItem,
        {
          [styles.focused]: useIsKeyboardFocused(props.id),
        },
        className
      )}
    />
  );
};

export default MenuItem;
