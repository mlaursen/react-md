import { forwardRef } from "react";
import cn from "classnames";
import type { ListElement, ListProps } from "@react-md/list";
import { List } from "@react-md/list";
import type { CollapseProps } from "@react-md/transition";
import { useCollapseTransition } from "@react-md/transition";

export interface TreeGroupProps
  extends ListProps,
    Omit<CollapseProps<ListElement>, "children"> {}

/**
 * The `TreeGroup` component is used to render a tree item's nested items
 * whenever the `expanded` prop is `true`. It uses the `Collapse` component
 * behind the scenes to animate in-and-out of view and will fully unrender when
 * the `expanded` prop is `false`.
 */
export const TreeGroup = forwardRef<ListElement, TreeGroupProps>(
  function TreeGroup(
    {
      style,
      className,
      collapsed,
      minHeight,
      minPaddingBottom,
      minPaddingTop,
      timeout,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      children,
      temporary,
      ...props
    },
    nodeRef
  ) {
    const { elementProps, rendered } = useCollapseTransition({
      style,
      className: cn("rmd-tree-group", className),
      nodeRef,
      minHeight,
      minPaddingBottom,
      minPaddingTop,
      timeout,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      temporary,
      transitionIn: !collapsed,
    });

    if (!rendered) {
      return null;
    }

    return (
      <List {...props} {...elementProps} role="group">
        {children}
      </List>
    );
  }
);
