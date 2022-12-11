import { useCollapseTransition } from "@react-md/core";
import type { ListProps } from "@react-md/list";
import { List } from "@react-md/list";
import type { ReactNode } from "react";
import { forwardRef } from "react";

import { treeGroup } from "./styles";
import { useTreeContext } from "./TreeProvider";

type CSSProperties = React.CSSProperties & {
  "--rmd-tree-depth": number;
};

export interface OverridableTreeGroupProps extends ListProps {
  /**
   * @defaultValue `false`
   */
  temporary?: boolean;

  /** @defaultValue `false` */
  disableTransition?: boolean;
}

export interface TreeGroupProps extends OverridableTreeGroupProps {
  children: ReactNode;
  depth: number;
  collapsed: boolean;
}

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
