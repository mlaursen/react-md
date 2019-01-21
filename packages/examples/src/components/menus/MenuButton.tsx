import React, { FunctionComponent } from "react";
import cn from "classnames";
import { theme, IButtonThemeProps } from "@react-md/button";
import {
  MenuButton as WIAMenuButton,
  MenuButtonProps,
  useIsKeyboardFocused,
} from "@react-md/wia-aria";

import styles from "./menu.module.scss";

export interface IMenuButtonProps extends IButtonThemeProps {}

const MenuButton: FunctionComponent<
  IMenuButtonProps & MenuButtonProps
> = allProps => {
  const { theme: t, themeType, buttonType, className, ...props } = allProps;
  return (
    <WIAMenuButton
      {...props}
      className={cn(theme(allProps), {
        [styles.focused]: useIsKeyboardFocused(props.id),
      })}
    />
  );
};

export default MenuButton;
