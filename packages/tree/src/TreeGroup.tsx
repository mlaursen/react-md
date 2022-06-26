import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cnb } from "cnbuilder";
import { useCollapseTransition } from "@react-md/core";
import type { ListProps } from "@react-md/list";
import { List } from "@react-md/list";

const noop = (): undefined => undefined;

export interface TreeGroupProps extends Omit<ListProps, "children"> {
  collapsed: boolean;
  renderChildItems?(): ReactNode;
  disableTransition?: boolean;
}

export function TreeGroup(props: TreeGroupProps): ReactElement | null {
  const {
    className,
    renderChildItems = noop,
    disableTransition = false,
    collapsed,
    ...remaining
  } = props;
  const { elementProps, rendered } = useCollapseTransition({
    enter: !disableTransition,
    exit: !disableTransition,
    transitionIn: !collapsed,
    className: cnb("rmd-tree-group", className),
  });

  if (!rendered) {
    return null;
  }

  return (
    <List {...remaining} {...elementProps} role="group">
      {renderChildItems()}
    </List>
  );
}
