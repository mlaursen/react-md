import React, { forwardRef, ReactElement, Ref } from "react";
import cn from "classnames";
import { List, ListElement, ListProps } from "@react-md/list";
import { Collapse, CollapseProps } from "@react-md/transition";

export interface TreeGroupProps
  extends ListProps,
    Omit<CollapseProps, "children"> {}

/**
 * The `TreeGroup` component is used to render a tree item's nested items
 * whenever the `expanded` prop is `true`. It uses the `Collapse` component
 * behind the scenes to animate in-and-out of view and will fully unrender when
 * the `expanded` prop is `false`.
 */
function TreeGroup(
  {
    style,
    className,
    collapsed,
    minHeight,
    minPaddingBottom,
    minPaddingTop,
    enterDuration,
    leaveDuration,
    isEmptyCollapsed = true,
    onExpanded,
    onCollapsed,
    children,
    ...props
  }: TreeGroupProps,
  ref?: Ref<ListElement>
): ReactElement {
  return (
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
      <List {...props} ref={ref} role="group">
        {children}
      </List>
    </Collapse>
  );
}

const ForwardedTreeGroup = forwardRef<ListElement, TreeGroupProps>(TreeGroup);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTreeGroup.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      collapsed: PropTypes.bool.isRequired,
      minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      minPaddingBottom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      enterDuration: PropTypes.number,
      leaveDuration: PropTypes.number,
      isEmptyCollapsed: PropTypes.bool,
      children: PropTypes.node,
      onExpanded: PropTypes.func,
      onCollapsed: PropTypes.func,
    };
  } catch (e) {}
}

export default ForwardedTreeGroup;
