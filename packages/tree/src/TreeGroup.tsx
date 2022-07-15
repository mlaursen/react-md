import { useCollapseTransition } from "@react-md/core";
import type { ListProps } from "@react-md/list";
import { List } from "@react-md/list";
import type { ReactNode } from "react";
import { forwardRef } from "react";

import { treeGroup } from "./styles";

type CSSProperties = React.CSSProperties & {
  "--rmd-tree-depth": number;
};

export interface TreeGroupProps extends ListProps {
  children: ReactNode;
  depth: number;
  collapsed: boolean;

  /** @defaultValue `false` */
  disableTransition?: boolean;
}

export const TreeGroup = forwardRef<HTMLUListElement, TreeGroupProps>(
  function TreeGroup(props, ref) {
    const {
      className,
      collapsed,
      depth,
      onClick,
      onMouseDown,
      disableTransition = false,
      ...remaining
    } = props;

    const style: CSSProperties = {
      ...remaining.style,
      "--rmd-tree-depth": depth,
    };

    const { elementProps, rendered } = useCollapseTransition({
      style,
      nodeRef: ref,
      enter: !disableTransition,
      exit: !disableTransition,
      transitionIn: !collapsed,
      className: treeGroup({ className }),
    });

    if (!rendered) {
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
      />
    );
  }
);
