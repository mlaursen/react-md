import type { ReactElement } from "react";
import {
  AppBarTitle,
  ArrowDropDownSVGIcon,
  BELOW_INNER_RIGHT_ANCHOR,
  DropdownMenu,
  isToggleableLayout,
  useLayoutConfig,
} from "react-md";

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
        className={styles.menu}
      >
        <PreviousDocsMenuItems small />
      </DropdownMenu>
    </>
  );
}
