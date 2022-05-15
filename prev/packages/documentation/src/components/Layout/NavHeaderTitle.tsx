import type { ReactElement } from "react";
import { AppBarTitle, useActionClassName } from "@react-md/app-bar";
import { useLayoutConfig, isToggleableLayout } from "@react-md/layout";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { BELOW_INNER_RIGHT_ANCHOR } from "@react-md/utils";

import { RMD_MAJOR_VERSION } from "constants/rmdVersion";

import styles from "./NavHeaderTitle.module.scss";
import PreviousDocsMenuItems from "./PreviousDocsMenuItems";

export default function NavHeaderTitle(): ReactElement {
  const { layout } = useLayoutConfig();
  return (
    <>
      <AppBarTitle keyline={!isToggleableLayout(layout)}>react-md</AppBarTitle>
      <DropdownMenu
        id="version-picker"
        icon={<ArrowDropDownSVGIcon />}
        anchor={BELOW_INNER_RIGHT_ANCHOR}
        buttonChildren={`@v${RMD_MAJOR_VERSION}`}
        className={useActionClassName({
          last: true,
          className: styles.menu,
        })}
      >
        <PreviousDocsMenuItems small />
      </DropdownMenu>
    </>
  );
}
