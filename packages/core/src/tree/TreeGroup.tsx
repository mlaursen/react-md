"use client";

import { type CSSProperties, type ReactElement, type ReactNode } from "react";

import { List, type ListProps } from "../list/List.js";
import { useCollapseTransition } from "../transition/useCollapseTransition.js";
import { useTreeContext } from "./TreeProvider.js";
import { treeGroup } from "./styles.js";

/**
 * @since 6.0.0
 */
export interface OverridableTreeGroupProps extends ListProps {
  /** @defaultValue `false` */
  temporary?: boolean;

  /** @defaultValue `false` */
  disableTransition?: boolean;
}

/**
 * @internal
 * @since 6.0.0
 */
export interface TreeGroupProps extends OverridableTreeGroupProps {
  children: ReactNode;
  depth: number;
  collapsed: boolean;
}

/**
 * **Client Component**
 *
 * @internal
 * @since 6.0.0 Removed the collapse options and is no longer a
 * "public" component.
 */
export function TreeGroup(props: TreeGroupProps): ReactElement | null {
  const {
    ref,
    className,
    collapsed,
    depth,
    onClick,
    onMouseDown,
    children,
    temporary: propTemporary,
    disableTransition = false,
    ...remaining
  } = props;

  const style: CSSProperties = {
    ...remaining.style,
    "--rmd-tree-depth": depth,
  };

  const { temporaryChildItems } = useTreeContext();
  const temporary = propTemporary ?? temporaryChildItems;

  const { elementProps, rendered } = useCollapseTransition({
    style,
    nodeRef: ref,
    enter: !disableTransition,
    exit: !disableTransition,
    transitionIn: !collapsed,
    temporary,
    className: treeGroup({ className }),
  });

  if (!rendered || !children) {
    return null;
  }

  return (
    <List
      {...remaining}
      onClick={(event) => {
        onClick?.(event);
        // always stop propagation for click events and mousedown for groups
        // so that the parent child item's click and mousedown events aren't
        // also fired while there are disabled child elementsS or
        // non-interactable (like dividers or subheader)
        event.stopPropagation();
      }}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        event.stopPropagation();
      }}
      {...elementProps}
      role="group"
    >
      {children}
    </List>
  );
}
