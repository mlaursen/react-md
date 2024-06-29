import scssVariables from "@react-md/app-bar/dist/scssVariables";
import type { ReactElement } from "react";
import {
  DropdownMenu,
  LinkSVGIcon,
  MenuItemSeparator,
  MoreVertSVGIcon,
  unitToNumber,
} from "react-md";

import { CodePreferenceToggle } from "components/CodePreference";

import GithubLink from "./GithubLink";
import PreviousDocsMenuItems from "./PreviousDocsMenuItems";
import TableOfContentsMenuItem from "./TableOfContentsMenuItem";
import ToggleRTL from "./ToggleRTL";
import ToggleTheme from "./ToggleTheme";

const margin = unitToNumber(scssVariables["rmd-app-bar-lr-margin"]);
const options = {
  vwMargin: margin,
  vhMargin: margin,
};

export default function ActionMenu(): ReactElement {
  return (
    (<DropdownMenu
      id="main-app-actions"
      aria-label="Actions"
      menuLabel="Actions"
      buttonType="icon"
      buttonChildren={<MoreVertSVGIcon />}
      fixedPositionOptions={options}>
      <ToggleTheme as="menuitem" />
      <ToggleRTL as="menuitem" />
      <CodePreferenceToggle as="menuitem" />
      <GithubLink as="menuitem" />
      <TableOfContentsMenuItem />
      <MenuItemSeparator />
      <DropdownMenu
        id="previous-documentation-links"
        buttonChildren="Documentation Version Links"
        leftAddon={<LinkSVGIcon />}
      >
        <PreviousDocsMenuItems />
      </DropdownMenu>
    </DropdownMenu>)
  );
}
