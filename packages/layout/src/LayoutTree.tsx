import React, { forwardRef, useEffect, useRef, CSSProperties } from "react";
import cn from "classnames";
import { BaseTreeItem, Tree, TreeData, TreeProps } from "@react-md/tree";

import defaultNavigationItemRenderer from "./defaultNavigationItemRenderer";
import { useLayoutConfig } from "./LayoutProvider";
import { LayoutNavigationItem } from "./types";
import { isTemporaryLayout } from "./utils";

export type BaseLayoutTreeProps<
  T extends BaseTreeItem = LayoutNavigationItem
> = Omit<TreeProps<T>, "id" | "data" | "aria-label" | "aria-labelledby">;

export interface LayoutTreeProps<T extends BaseTreeItem = LayoutNavigationItem>
  extends BaseLayoutTreeProps<T> {
  /**
   * The id to use for the tree. When this is omitted, it will be set to
   * `${baseId}-navigation-tree` where the `baseId` is the `id` provided to the
   * parent `Layout` component.
   */
  id?: string;

  /**
   * An optional `aria-label` to provide to the tree. This will be defaulted to
   * `"Navigation"`.
   */
  "aria-label"?: string;

  /**
   * An optional space-delimited list of ids that help describe this tree. This
   * can be used instead of an `aria-label` or alongside for additional screen
   * reader description.
   */
  "aria-labelledby"?: string;

  /**
   * Optional style to provide to the `<nav>` element surrounding the tree
   */
  navStyle?: CSSProperties;

  /**
   * Optional className to provide to the `<nav>` element surrounding the tree
   */
  navClassName?: string;

  /**
   * The navigation items to render.
   */
  navItems: TreeData<T>;

  /**
   * Boolean if the temporary navigation type should no longer automatically
   * close when the `selectedIds` updates to contain a new route when using the
   * `useLayoutNavigation` hook.  This makes it so when a user on mobile clicks
   * a route within your app in the main navigation pane, it will automatically
   * close if it was a link.
   */
  disableTemporaryAutoclose?: boolean;
}

/**
 * Renders the navigation tree for the Layout component that adds some
 * reasonable defaults to work with navigation items.
 */
const LayoutTree = forwardRef<HTMLUListElement, LayoutTreeProps>(
  function LayoutTree(
    {
      id: propId,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel = ariaLabelledBy ? undefined : "Navigation",
      className,
      navStyle,
      navClassName,
      navItems,
      labelKey = "children",
      valueKey = "children",
      itemRenderer = defaultNavigationItemRenderer,
      selectedIds,
      disableTemporaryAutoclose = false,
      ...props
    },
    ref
  ) {
    const { baseId, layout, hideNav, visible } = useLayoutConfig();
    const [selectedId] = selectedIds;
    const lastSelectedId = useRef(selectedId);
    const isTemporary = isTemporaryLayout(layout);

    const id = propId ?? `${baseId}-navigation-tree`;

    useEffect(() => {
      if (
        disableTemporaryAutoclose ||
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
    }, [disableTemporaryAutoclose, isTemporary, visible, hideNav, selectedId]);

    return (
      <nav
        id={`${id}-nav`}
        style={navStyle}
        className={cn("rmd-layout-nav", navClassName)}
      >
        <Tree
          {...props}
          id={id}
          ref={ref}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data={navItems}
          labelKey={labelKey}
          valueKey={valueKey}
          selectedIds={selectedIds}
          itemRenderer={itemRenderer}
          className={cn("rmd-layout-tree", className)}
        />
      </nav>
    );
  }
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    LayoutTree.propTypes = {
      id: PropTypes.string,
      "aria-label": PropTypes.string,
      "aria-labelledby": PropTypes.string,
      className: PropTypes.string,
      navStyle: PropTypes.object,
      navClassName: PropTypes.string,
      children: PropTypes.node,
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      navItems: PropTypes.object.isRequired,
      selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      itemRenderer: PropTypes.func,
      disableTemporaryAutoclose: PropTypes.bool,
    };
  } catch (error) {}
}

export default LayoutTree;
