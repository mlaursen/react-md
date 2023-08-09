"use client";
import type { CSSProperties, ReactNode } from "react";
import { forwardRef } from "react";
import type { ListProps } from "../list/List";
import { List } from "../list/List";
import { useCollapseTransition } from "../transition/useCollapseTransition";
import { useTreeContext } from "./TreeProvider";
import { treeGroup } from "./styles";

/**
 * @remarks \@since 6.0.0
 */
export interface OverridableTreeGroupProps extends ListProps {
  /** @defaultValue `false` */
  temporary?: boolean;

  /** @defaultValue `false` */
  disableTransition?: boolean;
}

/**
 * @internal
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0 Removed the collapse options and is no longer a
 * "public" component.
 */
export const TreeGroup = forwardRef<HTMLUListElement, TreeGroupProps>(
  function TreeGroup(props, ref) {
    const {
      className,
      collapsed,
      depth,
      hidden,
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
      hidden,
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
);
