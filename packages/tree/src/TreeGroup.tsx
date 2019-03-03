import React, { FunctionComponent } from "react";
import cn from "classnames";
import { Collapse, ICollapseProps } from "@react-md/transition";
import { List, IListProps } from "@react-md/list";
import { Omit } from "@react-md/utils";

export interface ITreeGroupProps
  extends IListProps,
    Omit<ICollapseProps, "children"> {}

/**
 * The `TreeGroup` component is used to render a tree item's nested items whenever the `expanded`
 * prop is `true`. It uses the `Collapse` component behind the scenes to animate in-and-out of view
 * and will fully unrender when the `expanded` prop is `false`.
 */
const TreeGroup: FunctionComponent<ITreeGroupProps> = ({
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
