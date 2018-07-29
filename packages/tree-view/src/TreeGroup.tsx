import * as React from "react";
import { Collapse } from "@react-md/transition";
import { List, IListProps, ListElement } from "@react-md/list";

export interface ITreeGroupProps extends IListProps {
  /**
   * Boolean if the group should be removed from the DOM when the group is not expanded.
   */
  isEmptyCollapsed?: boolean;

  /**
   * Boolean if the group is currently expanded.
   */
  expanded: boolean;
}

export interface ITreeGroupDefaultProps {
  isEmptyCollapsed: true;
}

export type TreeGroupWithDefaultProps = ITreeGroupProps & ITreeGroupDefaultProps;

const TreeGroup: React.SFC<ITreeGroupProps> = providedProps => {
  const {
    style,
    className,
    expanded,
    children,
    isEmptyCollapsed,
    ...props
  } = providedProps as TreeGroupWithDefaultProps;

  return (
    <Collapse style={style} className={className} collapsed={!expanded} isEmptyCollapsed={isEmptyCollapsed}>
      {({ refCallback, ...collapseProps }) => (
        <List {...props} role="group" {...collapseProps} ref={refCallback}>
          {children}
        </List>
      )}
    </Collapse>
  );
};

export default TreeGroup;
