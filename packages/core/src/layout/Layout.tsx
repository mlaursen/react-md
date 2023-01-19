import type { ReactElement } from "react";
import type { TreeItemNode } from "../tree";
import {
  DEFAULT_DESKTOP_LAYOUT,
  DEFAULT_LANDSCAPE_TABLET_LAYOUT,
  DEFAULT_PHONE_LAYOUT,
  DEFAULT_TABLET_LAYOUT,
} from "./constants";
import type { LayoutChildrenProps } from "./LayoutChildren";
import { LayoutChildren } from "./LayoutChildren";
import { LayoutProvider } from "./LayoutProvider";
import type { LayoutConfiguration, LayoutNavigationItem } from "./types";

export interface LayoutProps<T extends TreeItemNode = LayoutNavigationItem>
  extends LayoutConfiguration,
    LayoutChildrenProps<T> {}

export function Layout<T extends TreeItemNode = LayoutNavigationItem>(
  props: LayoutProps<T>
): ReactElement {
  const {
    id = "layout",
    phoneLayout = DEFAULT_PHONE_LAYOUT,
    tabletLayout = DEFAULT_TABLET_LAYOUT,
    landscapeTabletLayout = DEFAULT_LANDSCAPE_TABLET_LAYOUT,
    desktopLayout = DEFAULT_DESKTOP_LAYOUT,
    largeDesktopLayout,
    defaultToggleableVisible = false,
    ...remaining
  } = props;

  return (
    <LayoutProvider
      baseId={id}
      fixedAppBar={
        props.appBarProps?.fixed ?? typeof props.appBar === "undefined"
      }
      phoneLayout={phoneLayout}
      tabletLayout={tabletLayout}
      landscapeTabletLayout={landscapeTabletLayout}
      desktopLayout={desktopLayout}
      largeDesktopLayout={largeDesktopLayout}
      defaultToggleableVisible={defaultToggleableVisible}
    >
      <LayoutChildren id={id} {...remaining} />
    </LayoutProvider>
  );
}
