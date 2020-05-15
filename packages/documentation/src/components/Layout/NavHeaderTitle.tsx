import React, { FC } from "react";
import { AppBarTitle } from "@react-md/app-bar";
import { useLayoutConfig, isToggleableLayout } from "@react-md/layout";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { BELOW_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import styles from "./NavHeaderTitle.module.scss";
import Version1MenuItem from "./Version1MenuItem";

const NavHeaderTitle: FC = () => {
  const { layout } = useLayoutConfig();
  return (
    <>
      <AppBarTitle keyline={!isToggleableLayout(layout)}>react-md</AppBarTitle>
      <DropdownMenu
        id="version-picker"
        items={[<Version1MenuItem small />]}
        dropdownIcon={<ArrowDropDownSVGIcon />}
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        className={styles.menu}
      >
        @v2
      </DropdownMenu>
    </>
  );
};

export default NavHeaderTitle;
