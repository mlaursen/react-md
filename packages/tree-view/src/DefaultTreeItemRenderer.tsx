import * as React from "react";
import { IListItemBaseProps } from "@react-md/list";

import { ITreeViewItemInjectedProps } from "./types";
import { default as TreeItem, ITreeItemBaseProps } from "./TreeItem";
import TreeLinkItem from "./TreeLinkItem";
import TreeItemContent from "./TreeItemContent";
import TreeItemExpanderIcon from "./TreeItemExpanderIcon";
import TreeGroup from "./TreeGroup";

export interface IDefaultTreeItemRendererBaseProps extends IListItemBaseProps {
  [key: string]: any;
  href?: string;
  expanderLeft?: boolean;
  linkComponent?: React.ReactType;
}

interface IA11yProps {
  "aria-expanded"?: "true";
  "aria-level": number;
  "aria-setsize": number;
  "aria-posinset": number;
  tabIndex: 0 | -1;
}

export type IDefaultTreeItemRendererProps = IDefaultTreeItemRendererBaseProps & ITreeViewItemInjectedProps;

export interface IDefaultTreeItemRendererState {}

export default class DefaultTreeItemRenderer extends React.Component<
  IDefaultTreeItemRendererProps,
  IDefaultTreeItemRendererState
> {
  constructor(props: IDefaultTreeItemRendererProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount() {
    this.props.updateTreeItems();
  }

  public componentWillUnmount() {
    this.props.updateTreeItems();
  }

  public render() {
    const {
      depth,
      listSize,
      itemIndex,
      expanderLeft,
      linkComponent: propLinkComponent,
      updateTreeItems,
      renderChildItems,
      expanded,
      children,
      forceIconWrap: propForceIconWrap,
      leftIcon: propLeftIcon,
      rightIcon: propRightIcon,
      ...props
    } = this.props;
    const linkComponent = propLinkComponent || (typeof props.href === "string" && "a") || undefined;
    const forceIconWrap = propForceIconWrap || !!renderChildItems;
    const { selected } = props;
    let group;
    let leftIcon = propLeftIcon;
    let rightIcon = propRightIcon;
    if (renderChildItems) {
      const icon = <TreeItemExpanderIcon rotated={expanded} />;
      if (expanderLeft) {
        leftIcon = icon;
      } else {
        rightIcon = icon;
      }

      group = <TreeGroup expanded={expanded}>{renderChildItems()}</TreeGroup>;
    }

    const a11y = {
      "aria-expanded": expanded ? "true" : undefined,
      "aria-level": depth + 1,
      "aria-setsize": listSize,
      "aria-posinset": itemIndex + 1,
      tabIndex: selected ? 0 : -1,
    } as IA11yProps;

    if (linkComponent) {
      return (
        <TreeLinkItem
          {...props}
          {...a11y}
          linkComponent={linkComponent}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          forceIconWrap={forceIconWrap}
          group={group}
        >
          {children}
        </TreeLinkItem>
      );
    }

    return (
      <TreeItem {...props} {...a11y}>
        <TreeItemContent forceIconWrap={forceIconWrap} leftIcon={leftIcon} rightIcon={rightIcon} selected={selected}>
          {children}
        </TreeItemContent>
        {group}
      </TreeItem>
    );
  }
}
