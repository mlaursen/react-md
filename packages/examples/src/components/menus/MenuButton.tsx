import React, { FunctionComponent } from "react";
import cn from "classnames";
import { buttonThemeClassNames, IButtonThemeProps } from "@react-md/button";
import {
  MenuButton as WIAMenuButton,
  MenuButtonProps,
  useIsKeyboardFocused,
} from "@react-md/wia-aria";

export interface IMenuButtonProps extends IButtonThemeProps {}

const MenuButton: FunctionComponent<
  IMenuButtonProps & MenuButtonProps
> = allProps => {
  const { theme: t, themeType, buttonType, className, ...props } = allProps;
  return (
    <WIAMenuButton
      {...props}
      className={cn(buttonThemeClassNames(allProps), {
        "rmd-states--focused": useIsKeyboardFocused(props.id),
      })}
    />
  );
};

export default MenuButton;
