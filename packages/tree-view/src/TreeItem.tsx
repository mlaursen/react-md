import * as React from "react";
import cn from "classnames";
import * as PropTypes from "prop-types";
import { StatesConsumer } from "@react-md/states";
import { IconRotator } from "@react-md/icon";
import { IListItemBaseProps } from "@react-md/list";
import { KeyboardArrowDownSVGIcon } from "@react-md/material-icons";

import TreeItemContent from "./TreeItemContent";
import TreeGroup from "./TreeGroup";

export interface ITreeItemData {
  [key: string]: any;
  link?: boolean;
  itemId: string;
  children?: React.ReactNode;
  childItems?: ITreeItemData[];
}

export interface ITreeItemProps extends IListItemBaseProps, React.HTMLAttributes<HTMLLIElement> {
  /**
   * An optional aria-expanded attribute to apply to the tree item. This should only be provided as the value "true"
   * and only if it is currently expanded. It should be `undefined` otherwise.
   */
  "aria-expanded"?: "true";

  /**
   * The current level (depth) for the tree item.
   */
  "aria-level": number;
  "aria-posinset": number;
  "aria-setsize": number;
  role: "treeitem";
  item: ITreeItemData;
  tabIndex?: 0 | -1;
  expanded: boolean;
  selected: boolean;
  initItem: (itemId: string, item: HTMLElement) => void;
  deinitItem: (itemId: string, item: HTMLElement) => void;
  renderChildren: (item: ITreeItemData) => React.ReactNode;
  renderChildItems?: () => React.ReactNode;

  disabled?: boolean;
  expanderTo?: number;
  expanderFrom?: number;
  expanderIcon?: React.ReactElement<any> | React.ReactNode;
  expanderLeft?: boolean;
}

export interface ITreeItemDefaultProps {
  disabled: boolean;
  expanderTo: number;
  expanderFrom: number;
  expanderIcon: React.ReactElement<any>;
  expanderLeft: boolean;
  renderChildren: (item: ITreeItemData) => React.ReactNode;
}

export default class TreeItem extends React.Component<ITreeItemProps, {}> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: ITreeItemDefaultProps = {
    disabled: false,
    expanderTo: 0,
    expanderFrom: 90,
    expanderIcon: <KeyboardArrowDownSVGIcon />,
    expanderLeft: false,
    renderChildren: ({ children }) => children,
  };

  private instance: HTMLLIElement | null;
  constructor(props: ITreeItemProps) {
    super(props);

    this.state = {};
    this.instance = null;
  }

  public render() {
    const {
      className,
      disabled: propDisabled,
      renderChildren,
      renderChildItems,
      item,
      initItem,
      deinitItem,
      selected,
      expanded,
      leftIcon: propLeftIcon,
      rightIcon: propRightIcon,
      expanderIcon,
      expanderLeft,
      expanderFrom,
      expanderTo,
      forceIconWrap,
      onClick,
      onMouseDown,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onKeyDown,
      onKeyUp,
      ...props
    } = this.props;
    const { link } = item;

    let leftIcon = propLeftIcon;
    let rightIcon = propRightIcon;
    const isExpanderIconVisible = !!(renderChildItems && expanderIcon);
    if (isExpanderIconVisible) {
      const icon = (
        <IconRotator rotated={expanded} from={expanderFrom} to={expanderTo}>
          {expanderIcon}
        </IconRotator>
      );

      if (expanderLeft) {
        leftIcon = icon;
      } else {
        rightIcon = icon;
      }
    }
    if (link) {
      return null;
    }

    let group: React.ReactElement<any> | undefined;
    if (renderChildItems) {
      group = <TreeGroup expanded={expanded}>{renderChildItems()}</TreeGroup>;
    }

    return (
      <StatesConsumer
        selected={selected}
        disabled={propDisabled}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      >
        {statesProps => (
          <li {...props} ref={this.handleRef} className={cn("rmd-tree-item", className)}>
            <TreeItemContent
              {...statesProps}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              forceIconWrap={forceIconWrap || isExpanderIconVisible}
              expanded={expanded}
            >
              {renderChildren(item)}
            </TreeItemContent>
            {group}
          </li>
        )}
      </StatesConsumer>
    );
  }

  private handleRef = (instance: HTMLLIElement | null) => {
    const {
      initItem,
      deinitItem,
      item: { itemId },
    } = this.props;

    if (instance) {
      initItem(itemId, instance);
    } else if (this.instance) {
      deinitItem(itemId, this.instance);
    }

    this.instance = instance;
  };
}
