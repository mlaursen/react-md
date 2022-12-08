import { bem } from "@react-md/core";
import type { TreeItemNode } from "@react-md/tree";
import { Tree } from "@react-md/tree";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { DefaultLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationItemRenderer";
import { DefaultMiniLayoutNavigationItemRenderer } from "./DefaultLayoutNavigationMiniItemRenderer";
import { useLayoutConfig } from "./LayoutProvider";
import type { LayoutNavigationItem, LayoutTreeProps } from "./types";
import { isTemporaryLayout } from "./utils";

const styles = bem("rmd-layout-nav");

/**
 * Renders the navigation tree for the Layout component that adds some
 * reasonable defaults to work with navigation items.
 */
export function LayoutTree<T extends TreeItemNode = LayoutNavigationItem>(
  props: LayoutTreeProps<T>
): ReactElement {
  const {
    id: propId,
    "aria-labelledby": ariaLabelledBy,
    "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Navigation",
    className,
    mini = false,
    sticky = false,
    navStyle,
    navClassName,
    navItems,
    selectedIds,
    miniItemRenderer = DefaultMiniLayoutNavigationItemRenderer,
    renderer = mini ? miniItemRenderer : DefaultLayoutNavigationItemRenderer,
    disableTemporaryAutoClose = false,
    isTreeItem = (item: LayoutNavigationItem) =>
      !item.divider && !item.subheader,
    ...remaining
  } = props;
  const { baseId, layout, hideNav, visible } = useLayoutConfig();
  const [selectedId] = selectedIds;
  const lastSelectedId = useRef(selectedId);
  const isTemporary = isTemporaryLayout(layout);

  const id = propId ?? `${baseId}-navigation-tree`;

  useEffect(() => {
    if (
      disableTemporaryAutoClose ||
      !isTemporary ||
      !visible ||
      lastSelectedId.current === selectedId
    ) {
      // need to update the lastSelectedId since the selectedId might've changed
      // by a route change OUTSIDE of the navigation drawer. if it isn't
      // updated, it'll automatically close the next time it is opened.
      lastSelectedId.current = selectedId;
      return;
    }

    lastSelectedId.current = selectedId;
    hideNav();
  }, [disableTemporaryAutoClose, isTemporary, visible, hideNav, selectedId]);

  return (
    <nav
      id={`${id}-nav`}
      style={navStyle}
      className={cnb(styles({ sticky, grow: !sticky }), navClassName)}
    >
      <Tree
        {...remaining}
        isTreeItem={isTreeItem}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data={navItems}
        selectedIds={selectedIds}
        className={cnb("rmd-layout-tree", className)}
        renderer={renderer}
      />
    </nav>
  );
}
// );
