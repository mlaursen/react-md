import React, { forwardRef, ReactElement, Ref } from "react";
import { cnb } from "cnbuilder";
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
  }: TreeGroupProps,
  ref?: Ref<ListElement>
): ReactElement {
  return (
    <Collapse
      style={style}
      className={cnb("rmd-tree-group", className)}
      collapsed={collapsed}
      minHeight={minHeight}
      minPaddingBottom={minPaddingBottom}
      minPaddingTop={minPaddingTop}
      timeout={timeout}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      temporary={temporary}
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
      timeout: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          appear: PropTypes.number,
          enter: PropTypes.number,
          exit: PropTypes.number,
        }),
      ]),
      temporary: PropTypes.bool,
      children: PropTypes.node,
      onEnter: PropTypes.func,
      onEntering: PropTypes.func,
      onEntered: PropTypes.func,
      onExit: PropTypes.func,
      onExiting: PropTypes.func,
      onExited: PropTypes.func,
    };
  } catch (e) {}
}

export default ForwardedTreeGroup;
