import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Menu as WIAMenu, MenuProps } from "@react-md/wia-aria";

import styles from "./menu.module.scss";

const Menu: FunctionComponent<MenuProps> = ({ className, ...props }) => {
  return <WIAMenu className={cn(styles.menu, className)} {...props} />;
};

export default Menu;
