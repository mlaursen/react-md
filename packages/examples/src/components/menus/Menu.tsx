import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Menu as WIAMenu, MenuProps } from "@react-md/wia-aria";

const Menu: FunctionComponent<MenuProps> = ({ className, ...props }) => {
  return <WIAMenu className={cn("menu", className)} {...props} />;
};

export default Menu;
