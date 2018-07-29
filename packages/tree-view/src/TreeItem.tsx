// TODO: Make this a nice wrapper for rendering collapsable tree items
import * as React from "react";
import * as PropTypes from "prop-types";
import { Collapse } from "@react-md/transition";
import { ListLink, ListItemText, ListItemLeftIcon, ListItemRightIcon } from "@react-md/list";

export interface ITreeItemData {
  [key: string]: any;
  itemId: string;
  children?: React.ReactNode;
  childItems?: ITreeItemData[];
}

export interface ITreeItemProps {
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
  onItemSelect: (itemId: string) => void;
  onItemExpandedChange: (itemId: string, expanded: boolean) => void;
  initItem: (itemId: string, item: HTMLElement) => void;
  deinitItem: (itemId: string, item: HTMLElement) => void;
  renderChildren: (item: ITreeItemData) => React.ReactNode;
  renderChildItems?: () => React.ReactNode;
}

export interface ITreeItemDefaultProps {
  renderChildren: (item: ITreeItemData) => React.ReactNode;
}

export interface ITreeItemState {
  [key: string]: any;
}

export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {
  public static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  public static defaultProps: ITreeItemDefaultProps = {
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
      onItemSelect,
      onItemExpandedChange,
      renderChildren,
      renderChildItems,
      ...props
    } = this.props;
    console.log("props:", props);

    return (
      <li role="none" ref={this.handleRef}>
      </li>
    );
  }

  private handleRef = (instance: HTMLLIElement | null) => {
    const { initItem, deinitItem, item: { itemId } } = this.props;
    if (instance) {
      initItem(itemId, instance);
    } else if (this.instance) {
      deinitItem(itemId, this.instance);
    }

    this.instance = instance;
  };
}
