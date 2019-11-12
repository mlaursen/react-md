import React, { FC, forwardRef } from "react";
import cn from "classnames";
import { List, ListProps, ListElement } from "@react-md/list";
import { Collapse, CollapseProps } from "@react-md/transition";
import { WithForwardedRef } from "@react-md/utils";

export interface TreeGroupProps
  extends ListProps,
    Omit<CollapseProps, "children"> {}

type WithRef = WithForwardedRef<ListElement>;
type DefaultProps = Required<Pick<TreeGroupProps, "isEmptyCollapsed">>;
// type WithDefaultProps = TreeGroupProps & DefaultProps & WithRef;

/**
 * The `TreeGroup` component is used to render a tree item's nested items whenever the `expanded`
 * prop is `true`. It uses the `Collapse` component behind the scenes to animate in-and-out of view
 * and will fully unrender when the `expanded` prop is `false`.
 */
const TreeGroup: FC<TreeGroupProps & WithRef> = ({
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
  forwardedRef,
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
    <List {...props} ref={forwardedRef} role="group">
      {children}
    </List>
  </Collapse>
);

const defaultProps: DefaultProps = {
  isEmptyCollapsed: true,
};

TreeGroup.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TreeGroup.displayName = "TreeGroup";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TreeGroup.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
  }
}

export default forwardRef<ListElement, TreeGroupProps>((props, ref) => (
  <TreeGroup {...props} forwardedRef={ref} />
));
