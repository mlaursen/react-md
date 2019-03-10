import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Collapse, CollapseProps } from "@react-md/transition";
import { List, ListProps } from "@react-md/list";
import { Omit } from "@react-md/utils";

export interface TreeGroupProps
  extends ListProps,
    Omit<CollapseProps, "children"> {}

/**
 * The `TreeGroup` component is used to render a tree item's nested items whenever the `expanded`
 * prop is `true`. It uses the `Collapse` component behind the scenes to animate in-and-out of view
 * and will fully unrender when the `expanded` prop is `false`.
 */
const TreeGroup: FunctionComponent<TreeGroupProps> = ({
  style,
  className,
  collapsed,
  minHeight,
  minPaddingBottom,
  minPaddingTop,
  enterDuration,
  leaveDuration,
  isEmptyCollapsed,
  onExpanded,
  onCollapsed,
  children,
  ...props
}) => (
  <Collapse
    style={style}
    className={cn("rmd-tree-group", className)}
    collapsed={collapsed}
    minHeight={minHeight}
    minPaddingBottom={minPaddingBottom}
    minPaddingTop={minPaddingTop}
    enterDuration={enterDuration}
    leaveDuration={leaveDuration}
    isEmptyCollapsed={isEmptyCollapsed}
    onExpanded={onExpanded}
    onCollapsed={onCollapsed}
  >
    <List {...props} role="group">
      {children}
    </List>
  </Collapse>
);

TreeGroup.defaultProps = {
  isEmptyCollapsed: true,
};

export default TreeGroup;
