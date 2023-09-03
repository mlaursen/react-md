import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { Sheet } from "../sheet/Sheet.js";
import type { TreeItemNode } from "../tree/types.js";
import { bem } from "../utils/bem.js";
import { DefaultMiniLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationMiniItemRenderer.js";
import { LayoutNavigationHeader } from "./LayoutNavigationHeader.js";
import { useLayoutConfig } from "./LayoutProvider.js";
import { LayoutTree } from "./LayoutTree.js";
import type { LayoutNavigationItem, LayoutNavigationProps } from "./types.js";
import {
  isPersistentLayout,
  isTemporaryLayout,
  isToggleableLayout,
} from "./utils.js";

const styles = bem("rmd-layout-navigation");

/**
 * The container for the main navigation within the `Layout` that renders
 * differently depending on the current layout type.
 */
export function LayoutNavigation<T extends TreeItemNode = LayoutNavigationItem>(
  props: LayoutNavigationProps<T>
): ReactElement {
  const {
    id: propId,
    "aria-label": ariaLabel = "Navigation",
    "aria-labelledby": ariaLabelledby,
    className,
    children,
    mini = false,
    header: propHeader,
    headerProps,
    headerTitle,
    headerTitleProps,
    closeNav,
    closeNavProps,
    treeProps,
    sticky = false,
    temporary = false,
    miniNavItemRenderer = DefaultMiniLayoutNavigationItemRenderer,
    ...remaining
  } = props;

  const {
    baseId,
    layout,
    visible: isNonMiniVisible,
    hideNav,
  } = useLayoutConfig();
  const visible = mini || isNonMiniVisible;
  const id = propId || `${baseId}-${mini ? "mini-" : ""}nav-container`;

  const isTemporary = !mini && isTemporaryLayout(layout);
  const isPersistent = mini || isPersistentLayout(layout);
  const isToggleable = isToggleableLayout(layout);
  const floating = layout === "floating";

  let header = propHeader;
  if (!mini && typeof header === "undefined") {
    header = (
      <LayoutNavigationHeader
        key="header"
        closeNav={closeNav}
        closeNavProps={closeNavProps}
        title={headerTitle}
        titleProps={headerTitleProps}
        {...headerProps}
      />
    );
  }

  return (
    <Sheet
      {...remaining}
      // why did I add this key? removing it helps switch between the different layouts
      // with less animations
      // key={layout}
      id={id}
      // ref={ref}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      role={!isPersistent ? "dialog" : "none"}
      visible={visible}
      temporary={temporary}
      onRequestClose={hideNav}
      // do not want to portal for the other types so that logical tab order
      // is preserved
      disablePortal={!isTemporary}
      disableOverlay={!isTemporary}
      disableScrollLock={!isTemporary}
      isFocusTypeDisabled={(type) =>
        type === "keyboard" && (isToggleable || isPersistent)
      }
      className={cnb(
        styles({
          mini,
          sticky,
          floating,
          "header-offset": layout === "clipped" || floating,
        }),
        className
      )}
    >
      {header}
      {children}
      {treeProps && (
        <LayoutTree
          key="tree"
          miniItemRenderer={miniNavItemRenderer}
          sticky={mini && sticky}
          {...treeProps}
          mini={mini}
        />
      )}
    </Sheet>
  );
}
// });