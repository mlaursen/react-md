import { ReactElement } from "react";
import {
  DEFAULT_MENU_CONFIGURATION,
  MenuConfigurationProvider,
} from "@react-md/menu";
import { IconProvider } from "@react-md/icon";

import { DemoConfig } from "../types";
import DemoPage from "../DemoPage";

import README from "./README.md";

import SimpleExample from "./SimpleExample";
import simpleExample from "./SimpleExample.md";

import ConfigurableDropdownMenu from "./ConfigurableDropdownMenu";
import configurableDropdownMenu from "./ConfigurableDropdownMenu.md";

import FloatingActionButtonMenus from "./FloatingActionButtonMenus";
import floatingActionButtonMenus from "./FloatingActionButtonMenus.md";

import SimpleContextMenu from "./SimpleContextMenu";
import simpleContextMenu from "./SimpleContextMenu.md";

import NestedDropdownMenus from "./NestedDropdownMenus";
import nestedDropdownMenus from "./NestedDropdownMenus.md";

import MobileActionSheet from "./MobileActionSheet";
import mobileActionSheet from "./MobileActionSheet.md";

import MenusWithFormComponents from "./MenusWithFormComponents";
import menusWithFormComponents from "./MenusWithFormComponents.md";

import HoverableMenus from "./HoverableMenus";
import hoverableMenus from "./HoverableMenus.md";

const demos: DemoConfig[] = [
  {
    name: "Simple Example",
    description: simpleExample,
    children: <SimpleExample />,
  },
  {
    name: "Configurable Dropdown Menu",
    description: configurableDropdownMenu,
    children: <ConfigurableDropdownMenu />,
  },
  {
    name: "Floating Action Button Menus",
    description: floatingActionButtonMenus,
    children: <FloatingActionButtonMenus />,
    emulated: { fabOffset: true },
    disableCard: true,
  },
  {
    name: "Simple Context Menu",
    description: simpleContextMenu,
    children: <SimpleContextMenu />,
  },
  {
    name: "Nested Dropdown Menus",
    description: nestedDropdownMenus,
    children: <NestedDropdownMenus />,
  },
  {
    name: "Mobile Action Sheet",
    description: mobileActionSheet,
    children: <MobileActionSheet />,
  },
  {
    name: "Menus with Form Components",
    description: menusWithFormComponents,
    children: <MenusWithFormComponents />,
  },
  {
    name: "Hoverable Menus",
    description: hoverableMenus,
    children: <HoverableMenus />,
    fullPage: true,
    fullPageFAB: true,
    disableFullPageAppBar: true,
  },
];

// demos will be wrapped with the IconProvider just in-case people inspect the DOM
// to view the generated HTML. I want the demos to reflect the default behavior
// instead of the documentation overrides for SVG icons. Also reset the menu
// configuration back to the default
export default function Menu(): ReactElement {
  return (
    <MenuConfigurationProvider {...DEFAULT_MENU_CONFIGURATION}>
      <IconProvider>
        <DemoPage
          demos={demos}
          packageName="menu"
          fonts={["Material Icons"]}
          description={README}
        />
      </IconProvider>
    </MenuConfigurationProvider>
  );
}
