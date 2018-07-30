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
  itemId: string;
  link?: boolean;
  linkProps?: { [key: string]: any };
  linkComponent?: React.ReactType;
  tabIndex?: 0 | -1;
  expanded: boolean;
  selected: boolean;
  updateTreeItems: () => void;
  children?: React.ReactNode;
  renderChildItems?: () => React.ReactNode;
  dense?: boolean;

  disabled?: boolean;
  expanderTo?: number;
  expanderFrom?: number;
  expanderIcon?: React.ReactElement<any> | React.ReactNode;
  expanderLeft?: boolean;
}

export interface ITreeItemDefaultProps {
  link: boolean;
  linkComponent: string;
  disabled: boolean;
  expanderTo: number;
  expanderFrom: number;
  expanderIcon: React.ReactElement<any>;
  expanderLeft: boolean;
}

export type TreeItemWithDefaultProps = ITreeItemProps & ITreeItemDefaultProps;

export default class TreeItem extends React.Component<ITreeItemProps, {}> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: ITreeItemDefaultProps = {
    link: false,
    linkComponent: "a",
    disabled: false,
    expanderTo: 0,
    expanderFrom: 90,
    expanderIcon: <KeyboardArrowDownSVGIcon />,
    expanderLeft: false,
  };

  private instance: HTMLLIElement | HTMLAnchorElement | null;
  constructor(props: ITreeItemProps) {
    super(props);

    this.state = {};
    this.instance = null;
  }

  public render() {
    const {
      "aria-expanded": ariaExpanded,
      "aria-level": level,
      "aria-posinset": posInSet,
      "aria-setsize": setSize,
      role,
      tabIndex,
      className,
      disabled: propDisabled,
      children,
      renderChildItems,
      link,
      linkProps,
      linkComponent,
      itemId,
      updateTreeItems,
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
      dense,
      ...props
    } = this.props as TreeItemWithDefaultProps;
    const isExpanderIconVisible = !!(renderChildItems && expanderIcon);
    const a11y = {
      "aria-expanded": ariaExpanded,
      "aria-posinset": posInSet,
      "aria-setsize": setSize,
      "aria-level": level,
      role,
      tabIndex,
    };

    let leftIcon = propLeftIcon;
    let rightIcon = propRightIcon;
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
          <li
            {...props}
            {...(link ? { role: "none" } : a11y)}
            ref={this.handleRef}
            className={cn("rmd-tree-item", className)}
          >
            <TreeItemContent
              dense={dense}
              {...statesProps}
              {...linkProps}
              {...(link ? a11y : undefined)}
              link={link}
              linkComponent={linkComponent}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              forceIconWrap={forceIconWrap || isExpanderIconVisible}
              expanded={expanded}
            >
              {children}
            </TreeItemContent>
            {group}
          </li>
        )}
      </StatesConsumer>
    );
  }

  private handleRef = () => {
    this.props.updateTreeItems();
  };
}
